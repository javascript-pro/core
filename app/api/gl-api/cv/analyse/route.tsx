// app/api/gl-api/cv/analyse/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { resume, jd } = await req.json();

  if (!resume || !jd) {
    return new Response('Missing resume or job description', { status: 400 });
  }

  const prompt = `
You are a senior hiring consultant.

Evaluate the following CV against the provided job description and provide a structured response titled "fit".

Start your response with a clear judgement — is this candidate a good fit for the role?

Then, explain why or why not, highlighting:
- Relevant skills or experience that overlap
- Any strong alignment with the job description
- Any gaps worth noting

---CV---
${resume}

---Job Description---
${jd}
`;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      stream: true,
      temperature: 0.7,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!openaiRes.ok || !openaiRes.body) {
    console.error('OpenAI fetch failed', await openaiRes.text());
    return new Response('OpenAI stream failed', { status: 500 });
  }

  return new Response(openaiRes.body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
