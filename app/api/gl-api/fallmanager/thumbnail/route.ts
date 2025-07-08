// core/app/api/gl-api/fallmanager/thumbnail/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { adminDb, adminStorage } from '../../../../../gl-core/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';

const PDFCO_API_KEY = process.env.PDFCO_API_KEY;
if (!PDFCO_API_KEY) throw new Error('Missing PDFCO_API_KEY');

type PDFCoImageResponse = {
  url?: string;
  urls?: string[];
  pageCount?: number;
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
  try {
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

    const originalPath = docData.storagePath;
    const fileId = originalPath.split('/').pop()?.split('.')[0];
    if (!fileId) {
      return NextResponse.json({ error: 'Unable to parse fileId from storagePath' }, { status: 400 });
    }

    // Mark doc as processing
    await docRef.update({ thumbnailProcessing: true });

    const bucket = adminStorage.bucket();

    // ✅ Generate signed URL for PDF.co
    const [signedUrl] = await bucket.file(docData.storagePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 6 * 60 * 60 * 1000, // 6 hours
    });
    console.log('🔐 Using signed URL for PDF.co:', signedUrl);

    // 🔁 Call PDF.co to convert first page to JPG
    const pdfCoRes = await fetch('https://api.pdf.co/v1/pdf/convert/to/jpg', {
      method: 'POST',
      headers: {
        'x-api-key': PDFCO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: signedUrl,
        pages: '', // let PDF.co auto-detect pages
      }),
    });

    const rawText = await pdfCoRes.text();
    console.log('📄 Raw PDF.co response:', rawText);

    if (!pdfCoRes.ok) {
      return NextResponse.json({
        error: 'PDF.co request failed',
        detail: rawText,
      }, { status: pdfCoRes.status });
    }

    const pdfCoData = JSON.parse(rawText) as PDFCoImageResponse;
    const imageUrl = pdfCoData.url || pdfCoData.urls?.[0];

    if (!imageUrl) {
      return NextResponse.json({
        error: 'Invalid image URL(s) returned from PDF.co',
        detail: pdfCoData,
      }, { status: 500 });
    }

    // Download image from PDF.co
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      return NextResponse.json(
        { error: 'Failed to download image from PDF.co', detail: await imageRes.text() },
        { status: imageRes.status }
      );
    }

    const buffer = Buffer.from(await imageRes.arrayBuffer());
    const tempPath = join(tmpdir(), `${uuidv4()}.jpg`);
    await writeFile(tempPath, buffer);

    // Upload to Firebase Storage with public access
    const thumbnailPath = `fallmanager/${fileId}-thumb.jpg`;
    await bucket.upload(tempPath, {
      destination: thumbnailPath,
      contentType: 'image/jpeg',
      predefinedAcl: 'publicRead', // ✅ make it publicly accessible
      metadata: { cacheControl: 'public, max-age=31536000' },
    });

    const thumbnailUrl = `https://storage.googleapis.com/${bucket.name}/${thumbnailPath}`; // ✅ public URL

    await unlink(tempPath);

    await docRef.update({
      thumbnail: thumbnailUrl,
      thumbnailProcessing: false,
    });

    return NextResponse.json({ ok: true, thumbnail: thumbnailUrl });
  } catch (err: any) {
    console.error('❌ Thumbnail generation error:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
