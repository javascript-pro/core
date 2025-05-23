// core/app/api/gl-api/flickr/albums/route.ts

import { NextRequest, NextResponse } from 'next/server';

const FLICKR_API = 'https://api.flickr.com/services/rest/';
const flickrApiKey = process.env.FLICKR_KEY;
const flickrUserId = process.env.FLICKR_USER;

export async function GET(request: NextRequest) {
  if (!flickrApiKey || !flickrUserId) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr/albums`,
      status: 'warning',
      message: 'Missing Flickr API credentials in .env file.',
    });
  }

  try {
    const res = await fetch(
      `${FLICKR_API}?method=flickr.photosets.getList&api_key=${flickrApiKey}&user_id=${flickrUserId}&format=json&nojsoncallback=1`,
    );
    const data = await res.json();
    if (data.stat !== 'ok') throw new Error(data.message);

    const albums = data.photosets.photoset
      .sort((a: any, b: any) => parseInt(b.date_create) - parseInt(a.date_create))
      .map((set: any) => ({
        flickrId: set.id,
        title: set.title._content,
        description: set.description._content,
        count: parseInt(set.photos),
        dateCreate: parseInt(set.date_create),
        albumUrl: `https://www.flickr.com/photos/${flickrUserId}/albums/${set.id}`,
        primary: set.primary,
      }));

    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr/albums`,
      status: 'success',
      message: 'Album list fetched',
      result: albums,
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
