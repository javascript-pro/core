// core/app/api/gl-api/fallmanager/hochladen/route.ts
export const runtime = 'nodejs';

import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import {
  adminDb,
  adminStorage,
  admin,
} from '../../../../../gl-core/lib/firebaseAdmin';

const ALLOWED_EXTENSIONS = ['pdf'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const fallId = formData.get('fallId');

    if (typeof fallId !== 'string' || !fallId.trim()) {
      return NextResponse.json(
        { error: 'Fall-ID fehlt oder ist ungültig' },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Keine Datei hochgeladen' },
        { status: 400 },
      );
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = file.type || 'application/octet-stream';

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        {
          error: `Nur folgende Dateitypen sind erlaubt: ${ALLOWED_EXTENSIONS.join(', ')}`,
        },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileId = uuidv4();
    const storagePath = `fallmanager/${fallId}/${fileId}.${extension}`;
    const bucket = adminStorage.bucket();

    await bucket.file(storagePath).save(buffer, {
      contentType: mimeType,
    });

    const [downloadUrl] = await bucket.file(storagePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 6 * 3600 * 1000, // 6 hours
    });

    const fileData = {
      fileId,
      fileName: file.name,
      fileSize: file.size,
      mimeType,
      extension,
      storagePath,
      downloadUrl,
      status: 'uploaded',
      createdAt: admin.firestore.Timestamp.now(),
    };

    await adminDb
      .collection('fallmanager')
      .doc(fallId)
      .update({
        dateien: admin.firestore.FieldValue.arrayUnion(fileData),
      });

    return NextResponse.json({
      ok: true,
      fileId,
      fileName: file.name,
      downloadUrl,
    });
  } catch (err: any) {
    console.error('Fehler beim Datei-Upload:', err);
    return NextResponse.json(
      { error: err.message || 'Unbekannter Fehler beim Hochladen' },
      { status: 500 },
    );
  }
}
