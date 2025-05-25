// core/app/api/gl-api/route.ts

import { NextResponse } from 'next/server';
import { getBase } from './getBase';

export async function GET() {
  return NextResponse.json({
    time: Date.now(),
    base: `${getBase()}/`,
    endpoints: [
      {
        title: 'OpenAI',
        endpoints: [
          {
            title: 'Check status',
            entpoint: `${getBase()}/openai`,
          },
        ],
      },
      {
        title: 'Flickr',
        endpoints: [
          {
            title: 'Check status',
            entpoint: `${getBase()}/flickr`,
          },
          {
            title: 'Fetch Albums',
            entpoint: `${getBase()}/flickr/albums`,
          },
          {
            title: 'Fetch Album',
            entpoint: `${getBase()}/flickr/?album=72177720326317140`,
          },
        ],
      },
    ],
  });
}
