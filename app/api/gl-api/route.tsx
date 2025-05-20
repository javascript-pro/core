// core/app/api/gl-api/route.ts
import config from './config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { app = 'Goldlabel' } = config;

  return NextResponse.json({
    time: Date.now(),
    app,
    endpoint: 'gl-api',
    title: `${app} API`,
    flickr: 'http://localhost:3000/api/gl-api/flickr',
    openai: 'http://localhost:3000/api/gl-api/openai',
  });
}
