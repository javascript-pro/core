// /Users/goldlabel/GitHub/core/app/api/gl-api/fallmanager/hochladen/route.ts
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
    const storagePath = `fallmanager/${fileId}.${extension}`;
    const bucket = adminStorage.bucket();

    await bucket.file(storagePath).save(buffer, {
      contentType: mimeType,
    });

    // 🔁 Construct permanent public download URL
    const projectId = process.env.FIREBASE_PROJECT_ID;
    if (!projectId) {
      return NextResponse.json(
        {
          error: 'FIREBASE_PROJECT_ID is not defined in environment variables.',
        },
        { status: 500 },
      );
    }

    const encodedPath = encodeURIComponent(storagePath);
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodedPath}?alt=media`;

    const fileData = {
      fileId,
      fileName: file.name,
      fileSize: file.size,
      mimeType,
      extension,
      storagePath,
      downloadUrl,
      createdAt: admin.firestore.Timestamp.now(),
      uploadedBy: null,
      parsedText: '',
    };

    const docRef = await adminDb.collection('files').add(fileData);

    return NextResponse.json({
      ok: true,
      docId: docRef.id,
      downloadUrl,
      ...fileData,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
