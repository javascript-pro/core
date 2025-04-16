import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    app: 'Goldlabel Core API',
    time: Date.now(),
    endpoints: [
      {
        title: 'Good Fit?',
        route: '/api/goldlabel/good-fit',
      },
    ],
  });
}
