import config from '../response.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { app, baseurl, frontend } = config;

  return NextResponse.json({
    time: Date.now(),
    frontend,
    baseurl,
    app,
    verbs: ['GET', 'POST'],
  });
}
