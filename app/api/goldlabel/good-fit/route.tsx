import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    appName: "Good Fit?",
    time: Date.now(),
    endpoints: [
      {
        title: "New request",
        route: "/api/goldlabel/good-fit",
        verb: "POST",
      },
    ],
  });
}
