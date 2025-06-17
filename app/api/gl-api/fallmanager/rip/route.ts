// core/app/api/gl-api/fallmanager/rip/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../../gl-core/lib/firebaseAdmin';
import vision from '@google-cloud/vision';
import { join } from 'path';
import { tmpdir } from 'os';
import { writeFile, unlink } from 'fs/promises';
import fetch from 'node-fetch';
import {
  getDocument,
  GlobalWorkerOptions,
  PDFWorker,
} from 'pdfjs-dist/build/pdf.js';

// --- PATCH: force fake worker, never try to require worker file ---
GlobalWorkerOptions.workerSrc = false as any;
(PDFWorker as any).getWorkerSrc = () => null;

// --- Vision Client with base64 credentials from .env ---
const visionClient = new vision.ImageAnnotatorClient(
  process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_BASE64
    ? {
        credentials: JSON.parse(
          Buffer.from(
            process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_BASE64,
            'base64',
          ).toString('utf-8'),
        ),
      }
    : undefined,
);

async function extractPdfText(buffer: Buffer): Promise<string> {
  const uint8Array = new Uint8Array(buffer);
  const pdf = await getDocument({ data: uint8Array }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => (item as any).str).join(' ') + ' ';
  }
  return text.trim();
}

export async function POST(req: NextRequest) {
  const { uploadId } = await req.json();

  if (!uploadId) {
    return NextResponse.json({ error: 'Missing uploadId' }, { status: 400 });
  }

  try {
    const ref = adminDb.collection('uploads').doc(uploadId);
    const snap = await ref.get();

    if (!snap.exists) {
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
    if (!response.ok) {
      throw new Error(
        `Failed to fetch file from URL: ${url} (status ${response.status})`,
      );
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!buffer || !buffer.length) {
      throw new Error('Fetched file is empty or invalid');
    }

    let plainText = '';

    if (ext === '.pdf') {
      plainText = await extractPdfText(buffer);
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

    // Normalize to single paragraph
    plainText = plainText
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    await ref.update({
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
