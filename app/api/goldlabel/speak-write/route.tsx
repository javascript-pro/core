import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    appName: 'Goldlabel API',
    time: Date.now(),
    endpoints: [
      {
        title: 'Good Fit?',
        route: '/api/goldlabel/good-fit',
      },
    ],
  });
}
