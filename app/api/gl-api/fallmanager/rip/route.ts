// core/gl-api/fallmanager/rip/route.ts

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../gl-core/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import vision from '@google-cloud/vision';
import { join } from 'path';
import { tmpdir } from 'os';
import { writeFile, unlink } from 'fs/promises';
import fetch from 'node-fetch';

const visionClient = new vision.ImageAnnotatorClient();

export async function POST(req: NextRequest) {
  const { uploadId } = await req.json();

  if (!uploadId) {
    return NextResponse.json({ error: 'Missing uploadId' }, { status: 400 });
  }

  try {
    // 1. Get the upload document
    const ref = doc(db, 'uploads', uploadId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
    }

    const data = snap.data();
    const { url, extension } = data;

    if (!url || !extension) {
      return NextResponse.json(
        { error: 'Missing file information' },
        { status: 400 },
      );
    }

    const ext = extension.toLowerCase();
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());

    let plainText = '';

    // 2. Extract text based on extension
    if (ext === '.pdf') {
      const pdfParse = await import('pdf-parse');
      const result = await pdfParse.default(buffer);
      plainText = result.text;
    } else if (ext === '.docx') {
      const mammoth = await import('mammoth');
      const tmpPath = join(tmpdir(), `${uploadId}.docx`);
      await writeFile(tmpPath, buffer);
      const result = await mammoth.extractRawText({ path: tmpPath });
      plainText = result.value;
      await unlink(tmpPath);
    } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const tmpPath = join(tmpdir(), `${uploadId}${ext}`);
      await writeFile(tmpPath, buffer);
      const [result] = await visionClient.textDetection(tmpPath);
      plainText = result?.textAnnotations?.[0]?.description || '';
      await unlink(tmpPath);
    } else if (ext === '.txt' || ext === '.md' || ext === '.json') {
      plainText = buffer.toString('utf-8');
    } else {
      return NextResponse.json(
        { error: `Unsupported file type: ${ext}` },
        { status: 415 },
      );
    }

    // 3. Update Firestore document with the extracted plain text
    await updateDoc(ref, {
      plainText,
      rippedAt: new Date(),
    });

    return NextResponse.json({ success: true, plainText });
  } catch (err: any) {
    console.error('RIP error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}
