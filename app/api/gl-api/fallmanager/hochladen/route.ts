// core/app/api/gl-api/fallmanager/hochladen/route.ts
export const runtime = 'nodejs';
import {
  adminDb,
  adminStorage,
  admin,
} from '../../../../../gl-core/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Keine Datei hochgeladen' },
        { status: 400 },
      );
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (extension !== 'pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileId = uuidv4();
    const storagePath = `fallmanager/${fileId}.${extension}`;
    const bucket = adminStorage.bucket();

    await bucket.file(storagePath).save(buffer, {
      contentType: file.type || 'application/pdf',
    });

    const [downloadUrl] = await bucket.file(storagePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 6 * 3600 * 1000, // 6 hours
    });

    await adminDb.collection('fallmanager_pdf').doc(fileId).set({
      fileId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      extension,
      storagePath,
      downloadUrl,
      status: 'uploaded',
      createdAt: admin.firestore.Timestamp.now(),
    });

    return NextResponse.json({
      ok: true,
      fileId,
      fileName: file.name,
      downloadUrl,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 },
    );
  }
}
