export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import {
  adminDb,
  adminStorage,
} from '../../../../../gl-core/lib/firebaseAdmin';

const PDFCO_API_KEY = process.env.PDFCO_API_KEY;
if (!PDFCO_API_KEY) throw new Error('Missing PDFCO_API_KEY');

type PDFCoTextResponse = {
  body?: string;
  error?: string;
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
  const { id } = await req.json();

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid id' }, { status: 400 });
  }

  const docRef = adminDb.collection('files').doc(id);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    return NextResponse.json({ error: `Document with id '${id}' not found` }, { status: 404 });
  }

  const docData = snapshot.data() as FileDoc;

  if (!docData.storagePath) {
    return NextResponse.json({ error: 'Missing storagePath' }, { status: 400 });
  }

  try {
    // 🔄 Set processing flag
    await docRef.update({ rawTextProcessing: true });

    const bucket = adminStorage.bucket();

    // ✅ Generate signed URL for PDF.co
    const [signedUrl] = await bucket.file(docData.storagePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 6 * 60 * 60 * 1000, // 6 hours
    });
    console.log('🔐 Using signed URL for PDF.co:', signedUrl);

    // 🔁 Call PDF.co to convert PDF to plain text
    const pdfCoRes = await fetch('https://api.pdf.co/v1/pdf/convert/to/text', {
      method: 'POST',
      headers: {
        'x-api-key': PDFCO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: signedUrl,
        inline: true,
        pages: '',
      }),
    });

    const rawText = await pdfCoRes.text();
    console.log('📄 Raw PDF.co response:', rawText);

    if (!pdfCoRes.ok) {
      await docRef.update({ rawTextProcessing: false });
      return NextResponse.json(
        {
          error: 'PDF.co request failed',
          detail: rawText,
        },
        { status: pdfCoRes.status },
      );
    }

    const pdfCoData = JSON.parse(rawText) as PDFCoTextResponse;

    if (!pdfCoData.body) {
      await docRef.update({ rawTextProcessing: false });
      return NextResponse.json(
        {
          error: 'No text returned from PDF.co',
          detail: pdfCoData,
        },
        { status: 500 },
      );
    }

    // ✅ Save result to Firestore
    await docRef.update({
      rawText: pdfCoData.body,
      rawTextProcessing: false,
    });

    return NextResponse.json({ ok: true, rawText: pdfCoData.body });
  } catch (err: any) {
    console.error('❌ Text extraction error:', err);
    await docRef.update({ rawTextProcessing: false });
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
