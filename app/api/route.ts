// core/app/api/route.ts
import config from './gl-api/config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { app = '' } = config;

  return NextResponse.json({
    time: Date.now(),
    app: `${app} API`,
    start: 'http://localhost:3000/api/gl-api/',
  });
}
