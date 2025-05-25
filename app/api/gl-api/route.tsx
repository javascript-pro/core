// core/app/api/gl-api/route.ts

import { NextResponse } from 'next/server';
import { getBase } from './getBase';

export async function GET() {
  return NextResponse.json({
    time: Date.now(),
    base: `${getBase()}/`,
    flickr: [
      {
        flickr: `${getBase()}/flickr`,
        albums: `${getBase()}/flickr/albums`,
        album: `${getBase()}/flickr?album=72177720326317140`,
      },
    ],
  });
}
