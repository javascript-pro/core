import config from './config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { appTitle = 'App Title', endpoints, frontend } = config;

  return NextResponse.json({
    time: Date.now(),
    frontend,
    appTitle,
    endpoints,
  });
}
