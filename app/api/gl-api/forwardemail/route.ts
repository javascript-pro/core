import { NextRequest, NextResponse } from 'next/server';
import { getBase } from '../getBase';

export async function GET() {
  return NextResponse.json({
    time: Date.now(),
    base: `${getBase()}/`,
    endpoints: [
      {
        title: 'Forward Email',
        endpoint: `${getBase()}/forwardemail`,
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  const secret = process.env.FORWARD_EMAIL_SECRET;

  if (!secret || apiKey !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { subject, text, to } = await req.json();

  if (!subject || !text || !to) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    const res = await fetch('https://api.forwardemail.net/v1/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(`${process.env.FORWARD_EMAIL_API_KEY}:`).toString(
            'base64',
          ),
      },
      body: JSON.stringify({
        from: 'Goldlabel <notify@goldlabel.pro>',
        to,
        subject,
        text,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
