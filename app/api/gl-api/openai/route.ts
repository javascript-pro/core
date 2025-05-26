// core/app/api/gl-api/openai/route.ts

import { NextResponse } from 'next/server';
import { getBase } from '../getBase';

export async function GET() {
  return NextResponse.json({
    time: Date.now(),
    base: `${getBase()}/`,
    endpoints: [
      {
        title: 'Check status',
        entpoint: `${getBase()}/openai`,
      },
    ],
  });
}
