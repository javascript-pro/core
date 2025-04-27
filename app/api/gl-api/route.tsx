import config from './response.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { app = 'App Title', endpoints, frontend } = config;

  return NextResponse.json({
    time: Date.now(),
    frontend,
    app,
    endpoints,
  });
}
