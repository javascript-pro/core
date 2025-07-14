export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import {
  adminDb,
  adminStorage,
} from '../../../../../gl-core/lib/firebaseAdmin';

const PDFCO_API_KEY = process.env.PDFCO_API_KEY;
if (!PDFCO_API_KEY) throw new Error('Missing PDFCO_API_KEY');

type PDFCoAsyncResponse = {
  jobId?: string;
  url?: string;
  error?: boolean;
  message?: string;
};

type PDFCoJobStatusResponse = {
  status: 'working' | 'success' | 'failed' | string;
  url?: string;
};

type FileDoc = {
  downloadUrl?: string;
  storagePath?: string;
  [key: string]: any;
};

export async function GET() {
  return NextResponse.json({ error: 'Use POST method only' }, { status: 405 });
}

export async function POST(req: NextRequest) {
  console.log('[raw] Incoming request');

  const { id } = await req.json();
  console.log('[raw] Request body:', { id });

  if (!id || typeof id !== 'string') {
    console.warn('[raw] Invalid or missing id');
    return NextResponse.json(
      { error: 'Missing or invalid id' },
      { status: 400 },
    );
  }

  const docRef = adminDb.collection('files').doc(id);
  const snapshot = await docRef.get();
  console.log('[raw] Fetched Firestore doc:', snapshot.exists);

  if (!snapshot.exists) {
    return NextResponse.json(
      { error: `Document with id '${id}' not found` },
      { status: 404 },
    );
  }

  const docData = snapshot.data() as FileDoc;
  console.log('[raw] Firestore doc data:', docData);

  if (!docData.storagePath) {
    console.warn('[raw] Missing storagePath in Firestore doc');
    await docRef.update({
      rawTextProcessing: false,
      rawTextProcessed: false,
      rawTextSeverity: 'error',
      rawTextError: 'Missing storagePath in Firestore document',
    });
    return NextResponse.json({ error: 'Missing storagePath' }, { status: 400 });
  }

  try {
    console.log('[raw] Updating doc to show processing started...');
    await docRef.update({
      rawTextProcessing: true,
      rawTextProcessed: false,
      rawTextSeverity: 'info',
      rawTextError: '',
    });

    const bucket = adminStorage.bucket();
    console.log('[raw] Getting signed URL from GCS for', docData.storagePath);

    const [signedUrl] = await bucket.file(docData.storagePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 6 * 60 * 60 * 1000,
    });
    console.log('[raw] Signed URL:', signedUrl);

    console.log('[raw] Sending async request to PDF.co...');
    const pdfCoRes = await fetch('https://api.pdf.co/v1/pdf/convert/to/text', {
      method: 'POST',
      headers: {
        'x-api-key': PDFCO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: signedUrl,
        inline: true,
        async: true,
      }),
    });

    const asyncResText = await pdfCoRes.text();
    console.log('[raw] PDF.co async response:', asyncResText);

    if (!pdfCoRes.ok) {
      console.warn('[raw] PDF.co async request failed');
      await docRef.update({
        rawTextProcessing: false,
        rawTextProcessed: false,
        rawTextSeverity: 'error',
        rawTextError: `Status ${pdfCoRes.status}: ${asyncResText}`,
      });

      return NextResponse.json(
        { error: 'PDF.co async request failed', detail: asyncResText },
        { status: pdfCoRes.status },
      );
    }

    const asyncData = JSON.parse(asyncResText) as PDFCoAsyncResponse;

    if (!asyncData.jobId || !asyncData.url) {
      console.warn('[raw] Invalid async job response');
      await docRef.update({
        rawTextProcessing: false,
        rawTextProcessed: false,
        rawTextSeverity: 'error',
        rawTextError: 'Missing jobId or result URL from PDF.co',
      });

      return NextResponse.json(
        { error: 'Invalid PDF.co async response', detail: asyncData },
        { status: 500 },
      );
    }

    const checkJobStatus = async (
      jobId: string,
    ): Promise<PDFCoJobStatusResponse> => {
      const res = await fetch(
        `https://api.pdf.co/v1/job/check?jobid=${jobId}`,
        {
          headers: { 'x-api-key': PDFCO_API_KEY },
        },
      );

      const json = (await res.json()) as PDFCoJobStatusResponse;

      if (!json.status) {
        throw new Error('Missing status field in PDF.co job status response');
      }

      return json;
    };

    console.log('[raw] Polling PDF.co job status...');
    let jobStatus = 'working';
    let resultUrl = '';
    const maxAttempts = 10;
    let attempt = 0;

    while (jobStatus === 'working' && attempt < maxAttempts) {
      attempt++;
      const statusData = await checkJobStatus(asyncData.jobId!);
      jobStatus = statusData.status;
      resultUrl = statusData.url || '';

      console.log(`[raw] Attempt ${attempt}: status=${jobStatus}`);
      if (jobStatus === 'working') {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    if (jobStatus !== 'success' || !resultUrl) {
      await docRef.update({
        rawTextProcessing: false,
        rawTextProcessed: false,
        rawTextSeverity: 'error',
        rawTextError: `Job failed or timed out after ${attempt} attempts`,
      });
      return NextResponse.json(
        {
          error: 'PDF.co job did not complete successfully',
          status: jobStatus,
        },
        { status: 500 },
      );
    }

    console.log('[raw] Fetching final result from result URL...');
    const finalRes = await fetch(resultUrl);
    const rawText = await finalRes.text();

    console.log('[raw] Success! Updating Firestore document...');
    await docRef.update({
      rawText,
      rawTextProcessing: false,
      rawTextProcessed: true,
      rawTextSeverity: 'success',
      rawTextError: '',
    });

    return NextResponse.json({ ok: true, rawText });
  } catch (err: any) {
    console.error('[raw] Unhandled error:', err);
    await docRef.update({
      rawTextProcessing: false,
      rawTextProcessed: false,
      rawTextSeverity: 'error',
      rawTextError: err.message || 'Unknown error',
    });

    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
