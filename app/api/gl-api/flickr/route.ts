import { NextRequest, NextResponse } from 'next/server';
import { getBase } from '../getBase';
import { TFlickrPhoto, TFlickrPhotoSize } from '../types';

const FLICKR_API = 'https://api.flickr.com/services/rest/';
const flickrApiKey = process.env.FLICKR_KEY;
const flickrUserId = process.env.FLICKR_USER;

const CACHE_TTL = 1000 * 60 * 5;
const albumCache: Record<string, { time: number; photos: TFlickrPhoto[]; meta: any }> = {};
const photoCache: Record<string, { time: number; photo: TFlickrPhoto }> = {};

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

  const getSize = (label: string): TFlickrPhotoSize | undefined => {
    const s = sizesData.sizes.size.find((sz: any) => sz.label === label);
    return s
      ? {
          src: s.source,
          width: parseInt(s.width),
          height: parseInt(s.height),
        }
      : undefined;
  };

  const getBestSquare = (): TFlickrPhotoSize | undefined =>
    getSize('Large Square') || getSize('Square');

  return {
    flickrId: p.id,
    flickrUrl: `https://www.flickr.com/photos/${flickrUserId}/${p.id}`,
    title: p.title?._content,
    description: p.description?._content,
    time: new Date(p.dates?.taken).getTime(),
    lat: parseFloat(p.location?.latitude) || null,
    lng: parseFloat(p.location?.longitude) || null,
    meta: {
      tags: p.tags?.tag.map((t: any) => t.raw) || [],
    },
    sizes: {
      small: getSize('Small 320'),
      medium: getSize('Medium 800'),
      large: getSize('Large'),
      orig: getSize('Original'),
      thumb: getBestSquare(), // New thumbnail entry
    },
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const albumId = searchParams.get('album');
  const photoId = searchParams.get('photo');

  if (!flickrApiKey || !flickrUserId) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `${getBase()}/flickr`,
      status: 'warning',
      message: 'Missing Flickr API credentials in .env file.',
    });
  }

  if (photoId) {
    const cached = photoCache[photoId];
    if (cached && Date.now() - cached.time < CACHE_TTL) {
      return NextResponse.json({
        time: Date.now(),
        endpoint: `${getBase()}/api/gl-api/flickr?photo=${photoId}`,
        status: 'success',
        message: 'Served from cache',
        result: cached.photo,
      });
    }

    try {
      const result = await getPhotoWithSizes(photoId);
      photoCache[photoId] = { time: Date.now(), photo: result };
      return NextResponse.json({
        time: Date.now(),
        endpoint: `${getBase()}/api/gl-api/flickr?photo=${photoId}`,
        status: 'success',
        message: 'Photo info fetched from Flickr API',
        result,
      });
    } catch (err: any) {
      return NextResponse.json({
        time: Date.now(),
        endpoint: `/api/gl-api/flickr?photo=${photoId}`,
        status: 'warning',
        message: err.message || 'Error fetching photo info',
      });
    }
  }

  if (!albumId) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `${getBase()}/api/gl-api/flickr`,
      status: 'warning',
      message: 'You need to specify an album.',
      try: `${getBase()}/flickr?album=72177720326317140`,
      or: `${getBase()}/flickr/albums`,
    });
  }

  const cached = albumCache[albumId];
  const albumUrl = `https://www.flickr.com/photos/${flickrUserId}/albums/${albumId}`;

  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `${getBase()}/api/gl-api/flickr?album=${albumId}`,
      album: albumId,
      status: 'success',
      message: 'Served from cache',
      result: {
        meta: {
          ...cached.meta,
          albumUrl,
        },
        photos: cached.photos,
      },
    });
  }

  try {
    const flickrRes = await fetch(
      `${FLICKR_API}?method=flickr.photosets.getPhotos&api_key=${flickrApiKey}&photoset_id=${albumId}&user_id=${flickrUserId}&format=json&nojsoncallback=1&extras=description,date_taken,geo,tags,url_o,url_h,url_c,url_n`,
    );
    const data = await flickrRes.json();
    if (data.stat !== 'ok') throw new Error(data.message);

    const photos: TFlickrPhoto[] = data.photoset.photo.map((p: any) => ({
      flickrId: p.id,
      flickrUrl: `https://www.flickr.com/photos/${flickrUserId}/${p.id}`,
      title: p.title,
      description: p.description?._content || '',
      time: new Date(p.datetaken).getTime(),
      lat: parseFloat(p.latitude) || null,
      lng: parseFloat(p.longitude) || null,
      meta: { tags: p.tags?.split(' ') || [] },
      sizes: {
        orig: p.url_o
          ? {
              src: p.url_o,
              width: parseInt(p.width_o),
              height: parseInt(p.height_o),
            }
          : undefined,
        large: p.url_h
          ? {
              src: p.url_h,
              width: parseInt(p.width_h),
              height: parseInt(p.height_h),
            }
          : undefined,
        medium: p.url_c
          ? {
              src: p.url_c,
              width: parseInt(p.width_c),
              height: parseInt(p.height_c),
            }
          : undefined,
        small: p.url_n
          ? {
              src: p.url_n,
              width: parseInt(p.width_n),
              height: parseInt(p.height_n),
            }
          : undefined,
        thumb: undefined, // Not included in bulk API call
      },
    }));

    const coverPhoto = await getPhotoWithSizes(data.photoset.primary);

    const infoRes = await fetch(
      `${FLICKR_API}?method=flickr.photosets.getInfo&api_key=${flickrApiKey}&photoset_id=${albumId}&user_id=${flickrUserId}&format=json&nojsoncallback=1`,
    );
    const infoData = await infoRes.json();
    if (infoData.stat !== 'ok') throw new Error(infoData.message);

    const meta = {
      title: infoData.photoset.title?._content || '',
      albumId,
      albumUrl,
      coverPhoto,
      description: infoData.photoset.description?._content || '',
      total: parseInt(infoData.photoset.count_photos) || photos.length,
    };

    albumCache[albumId] = {
      time: Date.now(),
      meta,
      photos,
    };

    return NextResponse.json({
      time: Date.now(),
      endpoint: `${getBase()}/api/gl-api/flickr?album=${albumId}`,
      album: albumId,
      status: 'success',
      message: 'Flickr album fetched',
      result: {
        meta,
        photos,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      time: Date.now(),
      endpoint: `${getBase()}/api/gl-api/flickr?album=${albumId}`,
      status: 'warning',
      message: err.message || 'Error fetching album',
    });
  }
}
