// /Users/goldlabel/GitHub/core/app/api/gl-api/resend/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_API_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: 'Missing RESEND_API_KEY' },
      { status: 500 },
    );
  }

  const { to, subject, body } = await req.json();

  // Goldlabel Light Theme
  const primary = '#5E7978';
  const text = '#303030';
  const border = '#5E7978';
  const background = '#eeeeee';
  const logoUrl = 'https://goldlabel.pro/png/favicon.png';
  const homepage = 'https://goldlabel.pro';

  const html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          margin: 0;
          padding: 0;
          background: ${background};
          font-family: Arial, Helvetica, sans-serif;
          color: ${text};
        }
        .outer {
          width: 100%;
          background: ${background};
          padding: 40px 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid ${border};
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          background: #fff;
        }
        .header {
          background: ${primary};
          padding: 24px 16px;
          text-align: center;
        }
        .header a {
          text-decoration: none;
          display: inline-block;
        }
        .header img {
          height: 48px;
          vertical-align: middle;
          margin-bottom: 12px;
        }
        .subject {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          margin-top: 8px;
        }
        .content {
          padding: 24px;
          font-size: 16px;
          line-height: 1.6;
          color: ${text};
        }
        .content p {
          margin: 0 0 16px;
        }
        .footer {
          background: #f0f0f0;
          text-align: center;
          padding: 12px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="outer">
        <div class="container">
          <div class="header">
            <a href="${homepage}">
              <img src="${logoUrl}" alt="Goldlabel Logo" />
            </a>
            <div class="subject">${subject}</div>
          </div>
          <div class="content">
            <p>${body.replace(/\n/g, '<br/>')}</p>
          </div>
          <div class="footer">
            Sent from <a href="${homepage}" style="color:${primary}; text-decoration:none;">Goldlabel Core</a>
          </div>
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
        from: 'goldlabel@goldlabel.pro', // must be verified in Resend
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
