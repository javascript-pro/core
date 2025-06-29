// core/app/api/gl-api/fallmanager/upload/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import {
  adminDb,
  adminStorage,
} from '../../../../../gl-core/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import { getDocument, GlobalWorkerOptions, PDFWorker } from 'pdfjs-dist/build/pdf.js';
import { createCanvas } from 'canvas';

// --- PATCH: force fake worker, never try to require worker file ---
GlobalWorkerOptions.workerSrc = false as any;
(PDFWorker as any).getWorkerSrc = () => null;

export async function POST(req: NextRequest) {
  try {
    // Parse multipart form-data, expecting field 'file'
    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 },
      );
    }

    // Read file as Buffer (for Firebase) and Uint8Array (for pdfjs)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uint8array = new Uint8Array(buffer);

    // Generate unique IDs/paths
    const fileId = uuidv4();
    const storagePdfPath = `fallmanager_uploads/${fileId}.pdf`;
    const storageThumbPath = `fallmanager_uploads/${fileId}_thumb.jpg`;

    // Upload PDF to Firebase Storage
    const bucket = adminStorage.bucket();
    await bucket.file(storagePdfPath).save(buffer, {
      contentType: 'application/pdf',
    });

    const [pdfUrl] = await bucket.file(storagePdfPath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 12 * 3600 * 1000, // 12 hours
    });

    // Generate thumbnail (first page)
    const pdf = await getDocument({ data: uint8array }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport }).promise;
    const thumbnailBuffer = canvas.toBuffer('image/jpeg');

    // Upload thumbnail
    await bucket.file(storageThumbPath).save(thumbnailBuffer, {
      contentType: 'image/jpeg',
    });

    const [thumbUrl] = await bucket.file(storageThumbPath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 12 * 3600 * 1000,
    });

    // Write Firestore document
    const docRef = adminDb.collection('uploads').doc(fileId);
    await docRef.set({
      fileId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      pdfUrl,
      thumbUrl,
      status: 'done',
      createdAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
      fileId,
      pdfUrl,
      thumbUrl,
    });
  } catch (err: any) {
    console.error('UPLOAD error:', err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 },
    );
  }
}
