// /app/api/gl-api/flickr/albums/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../../../gl-core/lib/firebaseAdmin';

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

export async function POST(req: NextRequest) {
  if (!flickrApiKey || !flickrUserId) {
    return NextResponse.json(
      { status: 'error', message: 'Wrong Flickr API credentials' },
      { status: 500 },
    );
  }

  try {
    const { flickrId } = await req.json();
    if (!flickrId) {
      return NextResponse.json(
        { status: 'error', message: 'Missing flickrId in body' },
        { status: 400 },
      );
    }

    // 1. Check album exists
    const infoRes = await fetch(
      `${FLICKR_API}?method=flickr.photosets.getInfo&api_key=${flickrApiKey}&photoset_id=${flickrId}&user_id=${flickrUserId}&format=json&nojsoncallback=1`,
    );
    const infoData = await infoRes.json();
    if (infoData.stat !== 'ok') {
      return NextResponse.json(
        { status: 'error', message: 'Album not found' },
        { status: 404 },
      );
    }

    const albumInfo = infoData.photoset;

    // 2. Fetch all photos in the album
    const photosRes = await fetch(
      `${FLICKR_API}?method=flickr.photosets.getPhotos&api_key=${flickrApiKey}&photoset_id=${flickrId}&user_id=${flickrUserId}&extras=geo,date_taken,tags&format=json&nojsoncallback=1`,
    );
    const photosData = await photosRes.json();
    if (photosData.stat !== 'ok') {
      throw new Error(photosData.message || 'Unable to fetch album photos');
    }

    const photoObjects = await Promise.all(
      photosData.photoset.photo.map(async (p: any) => {
        try {
          return await getPhotoWithSizes(p.id);
        } catch (err) {
          console.warn(`Skipping photo ${p.id}:`, err);
          return null;
        }
      }),
    );

    const validPhotos = photoObjects.filter(Boolean) as TFlickrPhoto[];

    // 3. Check Firestore if album already exists
    const albumRef = adminDb.collection('flickr').doc('albums');
    const snap = await albumRef.get();
    const currentAlbums = snap.exists ? snap.data() || {} : {};
    if (currentAlbums[flickrId]) {
      return NextResponse.json(
        { status: 'error', message: 'Album already exists in Firestore' },
        { status: 400 },
      );
    }

    // 4. Create new album record
    const albumRecord = {
      title: albumInfo.title._content,
      description: albumInfo.description._content,
      count: albumInfo.count_photos,
      createdAt: parseInt(albumInfo.date_create) * 1000,
      updatedAt: Date.now(),
      flickrUrl: `https://www.flickr.com/photos/${flickrUserId}/albums/${flickrId}`,
      photos: validPhotos,
    };

    await albumRef.set({ [flickrId]: albumRecord }, { merge: true });

    return NextResponse.json({
      status: 'success',
      message: `Album ${flickrId} created with ${validPhotos.length} photos`,
      album: albumRecord,
    });
  } catch (err: any) {
    console.error('Create album error:', err);
    return NextResponse.json(
      { status: 'error', message: err.message || 'Unhandled error' },
      { status: 500 },
    );
  }
}
