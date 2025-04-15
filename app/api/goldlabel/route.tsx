import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    appName: "Goldlabel API",
    hello: true,
    now: Date.now(),
    cache: 'no-store',
  });
}
