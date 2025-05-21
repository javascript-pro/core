// core/app/api/gl-api/flickr/route.ts
import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';

export type TFlickrPhotoSize = {
  src: string;
  width: number;
  height: number;
};

export type TFlickrPhoto = {
  id?: string;
  flickrId: string;
  flickrUrl: string;
  title?: string;
  description?: string;
  lat?: number | null;
  lng?: number | null;
  time?: number;
  meta?: Record<string, any>;
  sizes?: {
    orig?: TFlickrPhotoSize;
    small?: TFlickrPhotoSize;
    medium?: TFlickrPhotoSize;
    large?: TFlickrPhotoSize;
  };
};

export async function GET(request: NextRequest) {
  const { apibase } = config;
  const description = 'Retrieves list of Flickr Photos in an album by album id';
  const { searchParams } = new URL(request.url);
  const album = searchParams.get('album');

  if (!album) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `${apibase}/flickr`,
      status: 'warning',
      message:
        'You need to specify a valid flickr album id in the query string like this ?album=72177720324245676',
    });
  }

  let status: 'success' | 'warning' = 'success';
  let message = 'All Good';

  // Simulate a valid album check (you’ll replace this with real Flickr logic)
  try {
    if (!album.startsWith('721')) {
      throw new Error('Invalid album ID format.');
    }

    // TODO: Call Flickr API here
  } catch (err: any) {
    status = 'warning';
    message = err.message || 'Unknown error during Flickr album lookup.';
    return NextResponse.json({
      time: Date.now(),
      endpoint: `${apibase}/flickr`,
      album,
      status,
      message,
    });
  }

  const result: TFlickrPhoto[] = [

  ];

  return NextResponse.json({
    time: Date.now(),
    endpoint: `${apibase}/flickr?album=${album}`,
    album,
    status,
    message,
    result,
  });
}
