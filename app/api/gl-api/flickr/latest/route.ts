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
    thumb?: TFlickrPhotoSize;
  };
};
const FLICKR_API = 'https://api.flickr.com/services/rest/';
const flickrApiKey = process.env.FLICKR_KEY;
const flickrUserId = process.env.FLICKR_USER;

export async function GET(request: NextRequest) {
  if (!flickrApiKey || !flickrUserId) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr/latest`,
      status: 'error',
      message: 'Missing Flickr API credentials in .env file.',
    });
  }

  try {
    const res = await fetch(
      `${FLICKR_API}?method=flickr.photosets.getList&api_key=${flickrApiKey}&user_id=${flickrUserId}&per_page=500&format=json&nojsoncallback=1`,
    );
    const data = await res.json();
    if (data.stat !== 'ok') {
      return NextResponse.json({
        time: Date.now(),
        endpoint: `/api/gl-api/flickr/latest`,
        status: 'error',
        message: data.message,
      });
      // throw new Error(data.message);
    };

    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr/latest`,
      status: 'success',
      message: 'Latest photos',
    });
  } catch (err: any) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr/albums`,
      status: 'error',
      message: err.message || 'Error fetching albums list',
    });
  }
}
