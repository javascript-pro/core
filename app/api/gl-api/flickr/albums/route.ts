import { NextRequest, NextResponse } from 'next/server';
import { TFlickrPhoto } from '../../types';

const FLICKR_API = 'https://api.flickr.com/services/rest/';
const flickrApiKey = process.env.FLICKR_KEY;
const flickrUserId = process.env.FLICKR_USER;

async function getPhotoWithSizes(photoId: string): Promise<TFlickrPhoto> {
  const infoRes = await fetch(
    `${FLICKR_API}?method=flickr.photos.getInfo&api_key=${flickrApiKey}&photo_id=${photoId}&user_id=${flickrUserId}&format=json&nojsoncallback=1`
  );
  const infoData = await infoRes.json();
  if (infoData.stat !== 'ok') throw new Error(infoData.message);
  const p = infoData.photo;

  const sizesRes = await fetch(
    `${FLICKR_API}?method=flickr.photos.getSizes&api_key=${flickrApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`
  );
  const sizesData = await sizesRes.json();
  if (sizesData.stat !== 'ok') throw new Error(sizesData.message);

  const getSize = (label: string) => {
    const s = sizesData.sizes.size.find((sz: any) => sz.label === label);
    return s
      ? { src: s.source, width: parseInt(s.width), height: parseInt(s.height) }
      : undefined;
  };

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
    sizes: {
      small: getSize('Small 320'),
      medium: getSize('Medium 800'),
      large: getSize('Large'),
      orig: getSize('Original'),
    },
  };
}

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
      `${FLICKR_API}?method=flickr.photosets.getList&api_key=${flickrApiKey}&user_id=${flickrUserId}&per_page=500&format=json&nojsoncallback=1`
    );
    const data = await res.json();
    if (data.stat !== 'ok') throw new Error(data.message);

    const sorted = data.photosets.photoset.sort(
      (a: any, b: any) => parseInt(b.date_create) - parseInt(a.date_create)
    );

    const albums = await Promise.all(
      sorted.map(async (set: any) => {
        let coverPhoto: TFlickrPhoto | undefined;
        try {
          coverPhoto = await getPhotoWithSizes(set.primary);
        } catch {
          coverPhoto = undefined;
        }

        return {
          flickrId: set.id,
          title: set.title._content,
          description: set.description._content,
          count: parseInt(set.photos),
          dateCreate: parseInt(set.date_create),
          albumUrl: `https://www.flickr.com/photos/${flickrUserId}/albums/${set.id}`,
          coverPhoto,
        };
      })
    );

    return NextResponse.json({
      time: Date.now(),
      endpoint: `/api/gl-api/flickr/albums`,
      status: 'success',
      message: 'Album list with cover photos fetched (per_page=500)',
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
