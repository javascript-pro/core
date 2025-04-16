import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { appTitle, baseurl } = config;

  return NextResponse.json({
    time: Date.now(),
    baseurl,
    appTitle,
    verbs: ['GET', 'POST'],
  });
}
