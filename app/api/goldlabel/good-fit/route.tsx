import { NextRequest, NextResponse } from 'next/server';
import { openai } from '../../../../lib/openai';
import { loadMarkdown } from '../../../../lib/loadMarkdown';

export const dynamic = 'force-dynamic'; // disable static caching

export async function POST(req: NextRequest) {
  const { jobDescription } = await req.json();

  if (!jobDescription || typeof jobDescription !== 'string') {
    return NextResponse.json({ error: 'Invalid job description' }, { status: 400 });
  }

  // Load resume content from markdown
  const resume = await loadMarkdown('work/resume');

  const prompt = `
You are a career coach. Assess the following resume against a job description.

1. Determine whether this resume is a good fit.
2. If yes, explain why.
3. Then rewrite the resume so it is tailored specifically for the role.

Respond in the following JSON format:

{
  "fit": true | false,
  "explanation": "...",
  "tailoredCV": "..." // optional
}

Resume:
${resume?.content}

Job Description:
${jobDescription}
  `.trim();

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const raw = chat.choices[0]?.message?.content?.trim();

    let json;
    try {
      json = JSON.parse(raw || '{}');
    } catch {
      return NextResponse.json({
        fit: false,
        explanation: 'The AI response could not be parsed as JSON.',
        tailoredCV: null,
      });
    }

    return NextResponse.json({
      fit: json.fit ?? false,
      explanation: json.explanation ?? 'No explanation provided.',
      tailoredCV: json.tailoredCV ?? null,
    });
  } catch (err) {
    console.error('[GoodFit] API Error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
