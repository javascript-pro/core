// core/app/api/gl-api/flickr/route.ts
import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { apibase, /* app */ } = config;


  return NextResponse.json({
    time: Date.now(),
    endpoint: `${apibase}/flickr`,
    description: 'Interacts with Flickr API',
    // verbs: ['GET'],
  });
}
