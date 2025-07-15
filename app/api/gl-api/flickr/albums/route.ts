// /app/api/gl-api/flickr/albums/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../../gl-core/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  const flickrApiKey = process.env.FLICKR_KEY!;
  const flickrUserId = process.env.FLICKR_USER!;
  if (!flickrApiKey || !flickrUserId) {
    return NextResponse.json(
      { status: 'error', message: 'Wrong Flickr API credentials' },
      { status: 500 },
    );
  }

  try {
    const { flickrId, mode } = await req.json();
    if (!flickrId) {
      return NextResponse.json(
        { status: 'error', message: 'Missing flickrId in body' },
        { status: 400 },
      );
    }

    const albumRef = adminDb.collection('flickr').doc('albums');
    const snap = await albumRef.get();
    const currentAlbums = snap.exists ? snap.data() || {} : {};
    const exists = !!currentAlbums[flickrId];

    // If mode is create but album already exists
    if (mode === 'create' && exists) {
      return NextResponse.json(
        { status: 'error', message: 'Album already exists in Firestore' },
        { status: 400 },
      );
    }

    // If mode is update but album does not exist
    if (mode === 'update' && !exists) {
      return NextResponse.json(
        { status: 'error', message: 'Album not found in Firestore to update' },
        { status: 404 },
      );
    }

    // Fetch album info
    const infoRes = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=${flickrApiKey}&photoset_id=${flickrId}&user_id=${flickrUserId}&format=json&nojsoncallback=1`,
    );
    const infoData = await infoRes.json();
    if (infoData.stat !== 'ok') {
      return NextResponse.json(
        { status: 'error', message: 'Album not found on Flickr' },
        { status: 404 },
      );
    }

    const albumInfo = infoData.photoset;

    // Fetch album photos
    const photosRes = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${flickrApiKey}&photoset_id=${flickrId}&user_id=${flickrUserId}&extras=geo,date_taken,tags&format=json&nojsoncallback=1`,
    );
    const photosData = await photosRes.json();
    if (photosData.stat !== 'ok') {
      throw new Error(photosData.message || 'Unable to fetch album photos');
    }

    // fetch photo sizes
    async function getPhotoWithSizes(photoId: string) {
      const infoRes = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${flickrApiKey}&photo_id=${photoId}&user_id=${flickrUserId}&format=json&nojsoncallback=1`,
      );
      const infoData = await infoRes.json();
      if (infoData.stat !== 'ok') throw new Error(infoData.message);

      const p = infoData.photo;

      const sizesRes = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${flickrApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`,
      );
      const sizesData = await sizesRes.json();
      if (sizesData.stat !== 'ok') throw new Error(sizesData.message);

      function getSize(label: string) {
        const s = sizesData.sizes.size.find((sz: any) => sz.label === label);
        return s
          ? { src: s.source, width: +s.width, height: +s.height }
          : undefined;
      }
      function getBestSquare() {
        return getSize('Large Square') || getSize('Square');
      }

      const cleanSizes = (sizes: any) =>
        Object.fromEntries(
          Object.entries(sizes).filter(([_, v]) => v !== undefined),
        );

      return {
        flickrId: p.id,
        flickrUrl: `https://www.flickr.com/photos/${flickrUserId}/${p.id}`,
        title: p.title._content,
        description: p.description._content,
        time: new Date(p.dates?.taken).getTime(),
        lat: parseFloat(p.location?.latitude) || null,
        lng: parseFloat(p.location?.longitude) || null,
        meta: { tags: p.tags?.tag.map((t: any) => t.raw) || [] },
        sizes: cleanSizes({
          thumb: getBestSquare(),
          small: getSize('Small 320'),
          medium: getSize('Medium 800'),
          large: getSize('Large'),
          orig: getSize('Original'),
        }),
      };
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

    const validPhotos = photoObjects.filter(Boolean);

    // Build album record
    const albumRecord = {
      title: albumInfo.title._content,
      description: albumInfo.description._content,
      count: albumInfo.count_photos,
      createdAt: parseInt(albumInfo.date_create) * 1000,
      updatedAt: Date.now(),
      flickrUrl: `https://www.flickr.com/photos/${flickrUserId}/albums/${flickrId}`,
      photos: validPhotos,
    };

    // Write (create or update) to Firestore
    await albumRef.set({ [flickrId]: albumRecord }, { merge: true });

    return NextResponse.json({
      status: 'success',
      message:
        mode === 'update'
          ? `Album "${albumInfo.title._content}" updated with ${validPhotos.length} photos`
          : `Album "${albumInfo.title._content}" created with ${validPhotos.length} photos`,
      album: albumRecord,
    });
  } catch (err: any) {
    console.error('Album handler error:', err);
    return NextResponse.json(
      { status: 'error', message: err.message || 'Unhandled error' },
      { status: 500 },
    );
  }
}
