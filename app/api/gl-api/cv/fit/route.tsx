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

Start by reading the job description below. Then evaluate the CV against it.

Begin your response with the **Job Title** from the job description, followed by a clear judgement: say "Excellent fit", "Decent fit", or "Not a fit", along with a brief explanation.
(Use "**Excellent fit**" instead of "Good fit" if the candidate is a strong match.)

Then write a structured section titled "Fit" that outlines:
- Overlapping skills and experience, with a focus on React and Next.js
- Specific strengths relevant to the job
- Any additional factors that make this candidate particularly suitable

If the CV shows expertise in React and Next.js, state this explicitly.

---Job Description---
${jd}

---CV---
${resume}
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
