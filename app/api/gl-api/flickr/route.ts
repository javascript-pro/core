// core/app/api/gl-api/flickr/route.ts
import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';


export type TFlickrPhoto = {
  id: string;
  flickrId: string;
  flickrUrl: string;
  title?: string;
  description?: string;
  lat?: number | null;
  lng?: number | null;
  time?: number;
  meta?: any;
  sizes?: {
    orig?: {
      src: string;
      width: number;
      height: number;
    };
    small?: {
      src: string;
      width: number;
      height: number;
    };
    medium?: {
      src: string;
      width: number;
      height: number;
    };
    large?: {
      src: string;
      width: number;
      height: number;
    };
  };
};

export async function GET(request: NextRequest) {
  const { apibase } = config;
  const description = 'Retrieves list of Flickr Photos in an album by album id';
  
  let error = false;
  let message = "All Good";

  if (error){
    return NextResponse.json({
    time: Date.now(),
    endpoint: `${apibase}/flickr`,
    description,
    status: 'error',
    message,
  });
  }

  return NextResponse.json({
    time: Date.now(),
    endpoint: `${apibase}/flickr`,
    description,
    status: 'success',
    result: [
      {
        flickrId: "54528014218",
        flickrURL: "https://www.flickr.com/photos/listingslab/54528014218",
        title: "Trucks",
        description: "Big boys camping",
        time: 0,
        meta: "tags etc",
        lat: 0,
        lng: 0,
        sizes: {
            orig: {
                src: "https://",
                width: 1200,
                height: 620
            },
        }
      }
    ],
  });
}
