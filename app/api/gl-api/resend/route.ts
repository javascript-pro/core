// /Users/goldlabel/GitHub/core/app/api/gl-api/resend/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getBase } from '../getBase';

export async function GET() {
  return NextResponse.json({
    time: Date.now(),
    base: `${getBase()}/`,
    endpoints: [
      {
        title: 'Resend',
        endpoint: `${getBase()}/resend`,
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_API_KEY;

  try {
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
