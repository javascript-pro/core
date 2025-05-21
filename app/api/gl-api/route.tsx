// core/app/api/gl-api/route.ts
import config from './config.json';
import { NextResponse } from 'next/server';

export async function GET() {
  const { apibase } = config;

  return NextResponse.json({
    time: Date.now(),
    endpoint: `${apibase}/`,
    endpoints: [
      {
        flickr:
          'http://localhost:3000/api/gl-api/flickr/?album=72177720324245676',
      },
    ],
  });
}
