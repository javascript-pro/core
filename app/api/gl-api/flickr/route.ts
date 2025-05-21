// core/app/api/gl-api/flickr/route.ts
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

const FLICKR_API = 'https://api.flickr.com/services/rest/';
const flickrApiKey = process.env.FLICKR_KEY;
const flickrUserId = process.env.FLICKR_USER;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const album = searchParams.get('album');

  if (!flickrApiKey || !flickrUserId) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr`,
      status: 'warning',
      message: 'Missing Flickr API credentials in .env file.',
    });
  }

  if (!album) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr`,
      status: 'warning',
      message:
        'You need to specify a valid flickr album id in the query string like this ?album=72177720324245676',
    });
  }

  let status: 'success' | 'warning' = 'success';
  let message = 'All Good';
  let result: TFlickrPhoto[] = [];

  try {
    const flickrRes = await fetch(
      `${FLICKR_API}?method=flickr.photosets.getPhotos&api_key=${flickrApiKey}&photoset_id=${album}&user_id=${flickrUserId}&format=json&nojsoncallback=1&extras=description,date_taken,geo,tags,url_o,url_h,url_c,url_n`
    );

    const data = await flickrRes.json();

    if (data.stat !== 'ok') {
      throw new Error(data.message || 'Flickr API returned an error');
    }

    result = data.photoset.photo.map((photo: any): TFlickrPhoto => {
      return {
        flickrId: photo.id,
        flickrUrl: `https://www.flickr.com/photos/${flickrUserId}/${photo.id}`,
        title: photo.title,
        description: photo.description?._content || '',
        time: new Date(photo.datetaken).getTime(),
        lat: parseFloat(photo.latitude) || null,
        lng: parseFloat(photo.longitude) || null,
        meta: { tags: photo.tags?.split(' ') || [] },
        sizes: {
          orig: photo.url_o
            ? { src: photo.url_o, width: parseInt(photo.width_o), height: parseInt(photo.height_o) }
            : undefined,
          large: photo.url_h
            ? { src: photo.url_h, width: parseInt(photo.width_h), height: parseInt(photo.height_h) }
            : undefined,
          medium: photo.url_c
            ? { src: photo.url_c, width: parseInt(photo.width_c), height: parseInt(photo.height_c) }
            : undefined,
          small: photo.url_n
            ? { src: photo.url_n, width: parseInt(photo.width_n), height: parseInt(photo.height_n) }
            : undefined,
        },
      };
    });
  } catch (err: any) {
    status = 'warning';
    message = err.message || 'Unknown error during Flickr album lookup.';
    result = [];
  }

  return NextResponse.json({
    time: Date.now(),
    endpoint: `/api/gl-api/flickr?album=${album}`,
    album,
    status,
    message,
    result,
  });
}
