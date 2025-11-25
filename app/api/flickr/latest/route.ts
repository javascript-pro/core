// app/api/gl-api/flickr/latest/update/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../gl-core/lib/firebaseAdmin';

export async function GET(_req: NextRequest) {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'Here are the latest Flickr photos from Firebase',
      photos: [],
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      message: err.message || 'Unhandled error',
    });
  }
}
