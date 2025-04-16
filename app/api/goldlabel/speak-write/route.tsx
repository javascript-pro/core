import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { appTitle, baseurl, frontend } = config;

  return NextResponse.json({
    time: Date.now(),
    frontend,
    baseurl,
    appTitle,
    verbs: ['GET', 'POST'],
  });
}
