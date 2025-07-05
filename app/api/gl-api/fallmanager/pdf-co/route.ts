export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { adminDb } from '../../../../../gl-core/lib/firebaseAdmin';

const PDFCO_API_KEY = process.env.PDFCO_API_KEY;

if (!PDFCO_API_KEY) {
  throw new Error('Missing PDFCO_API_KEY in environment variables');
}

type PDFCoResponse = {
  body: string;
  pageCount?: number;
  error?: string;
};

type AIAssistDoc = {
  downloadUrl?: string;
  [key: string]: any;
};

export async function GET() {
  return NextResponse.json({ error: 'Use POST method only' }, { status: 405 });
}

export async function POST(req: NextRequest) {
  try {
    console.log('✅ POST /api/gl-api/fallmanager/pdf-co called');

    const { id } = await req.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid id' },
        { status: 400 },
      );
    }

    const docRef = adminDb.collection('AIAssist').doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return NextResponse.json(
        { error: `Document with id '${id}' not found` },
        { status: 404 },
      );
    }

    const docData = snapshot.data() as AIAssistDoc;

    if (!docData.downloadUrl) {
      return NextResponse.json(
        { error: 'Document is missing downloadUrl' },
        { status: 400 },
      );
    }

    // Mark document as processing
    await docRef.update({ analysisStarted: true });

    // Call PDF.co API
    const pdfCoRes = await fetch('https://api.pdf.co/v1/pdf/convert/to/text', {
      method: 'POST',
      headers: {
        'x-api-key': PDFCO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: docData.downloadUrl,
        inline: true,
        pages: '',
      }),
    });

    if (!pdfCoRes.ok) {
      const errorText = await pdfCoRes.text();
      return NextResponse.json(
        { error: 'PDF.co request failed', detail: errorText },
        { status: pdfCoRes.status },
      );
    }

    const pdfCoData = (await pdfCoRes.json()) as PDFCoResponse;

    // Basic validation
    if (!pdfCoData.body || typeof pdfCoData.body !== 'string') {
      return NextResponse.json(
        { error: 'PDF.co returned invalid body' },
        { status: 500 },
      );
    }

    // Save result to Firestore
    await docRef.update({
      AIAssisted: true,
      docData: {
        rawText: pdfCoData.body,
      },
    });

    return NextResponse.json({ ok: true, result: pdfCoData });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler';
    console.error('❌ Error in pdf-co route:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
