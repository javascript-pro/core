// /Users/goldlabel/GitHub/core/app/api/gl-api/resend/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_API_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: 'Missing RESEND_API_KEY' },
      { status: 500 }
    );
  }

  const { to, subject, body } = await req.json();

  // Build a clean HTML template
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            background: #ffffff;
            max-width: 600px;
            margin: 40px auto;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            overflow: hidden;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          }
          .header {
            background: #1976d2;
            color: white;
            padding: 16px;
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            padding: 24px;
            color: #333;
            font-size: 16px;
            line-height: 1.5;
          }
          .footer {
            background: #f0f0f0;
            color: #777;
            padding: 12px;
            font-size: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">${subject}</div>
          <div class="content">
            <p>${body.replace(/\n/g, '<br/>')}</p>
          </div>
          <div class="footer">
            Sent from Goldlabel Core
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const mailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@goldlabel.pro', // must be a verified sender in Resend
        to,
        subject,
        html,
      }),
    });

    if (!mailRes.ok) {
      const err = await mailRes.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const json = await mailRes.json();
    return NextResponse.json({ success: true, data: json });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
