// app/api/gl-api/flickr/latest/update/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../../gl-core/lib/firebaseAdmin';

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
const flickrApiKey = process.env.FLICKR_KEY!;
const flickrUserId = process.env.FLICKR_USER!;

function getSizeByLabel(sizesData: any, label: string) {
  const s = sizesData.sizes.size.find((sz: any) => sz.label === label);
  return s
    ? { src: s.source, width: parseInt(s.width), height: parseInt(s.height) }
    : undefined;
}

function getBestSquare(sizesData: any) {
  return (
    getSizeByLabel(sizesData, 'Large Square') ||
    getSizeByLabel(sizesData, 'Square')
  );
}

function cleanSizes(sizes: TFlickrPhoto['sizes']) {
  return Object.fromEntries(
    Object.entries(sizes || {}).filter(([_, value]) => value !== undefined),
  );
}

async function getPhotoWithSizes(photoId: string): Promise<TFlickrPhoto> {
  const infoRes = await fetch(
    `${FLICKR_API}?method=flickr.photos.getInfo&api_key=${flickrApiKey}&photo_id=${photoId}&user_id=${flickrUserId}&format=json&nojsoncallback=1`,
  );
  const infoData = await infoRes.json();
  if (infoData.stat !== 'ok') throw new Error(infoData.message);

  const p = infoData.photo;

  const sizesRes = await fetch(
    `${FLICKR_API}?method=flickr.photos.getSizes&api_key=${flickrApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`,
  );
  const sizesData = await sizesRes.json();
  if (sizesData.stat !== 'ok') throw new Error(sizesData.message);

  return {
    flickrId: p.id,
    flickrUrl: `https://www.flickr.com/photos/${flickrUserId}/${p.id}`,
    title: p.title._content,
    description: p.description._content,
    time: new Date(p.dates?.taken).getTime(),
    lat: parseFloat(p.location?.latitude) || null,
    lng: parseFloat(p.location?.longitude) || null,
    meta: {
      tags: p.tags?.tag.map((t: any) => t.raw) || [],
    },
    sizes: cleanSizes({
      thumb: getBestSquare(sizesData),
      small: getSizeByLabel(sizesData, 'Small 320'),
      medium: getSizeByLabel(sizesData, 'Medium 800'),
      large: getSizeByLabel(sizesData, 'Large'),
      orig: getSizeByLabel(sizesData, 'Original'),
    }),
  };
}

export async function GET(_req: NextRequest) {
  if (!flickrApiKey || !flickrUserId) {
    return NextResponse.json({
      status: 'error',
      message: 'Wrong Flickr API credentials',
    });
  }

  try {
    const res = await fetch(
      `${FLICKR_API}?method=flickr.people.getPublicPhotos&api_key=${flickrApiKey}&user_id=${flickrUserId}&per_page=100&extras=geo,date_taken,tags&format=json&nojsoncallback=1`,
    );
    const data = await res.json();
    if (data.stat !== 'ok') throw new Error(data.message);

    const photos = await Promise.all(
      data.photos.photo.map(async (p: any) => {
        try {
          return await getPhotoWithSizes(p.id);
        } catch (err) {
          console.warn(`Skipping photo ${p.id}: ${err}`);
          return null;
        }
      }),
    );

    const validPhotos = photos.filter(Boolean) as TFlickrPhoto[];

    await adminDb.collection('flickr').doc('latest').set({
      photos: validPhotos,
      updatedAt: Date.now(),
      count: validPhotos.length,
    });

    return NextResponse.json({
      status: 'success',
      message: 'Saved latest 100 photos',
      count: validPhotos.length,
      validPhotos,
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      message: err.message || 'Unhandled error',
    });
  }
}
