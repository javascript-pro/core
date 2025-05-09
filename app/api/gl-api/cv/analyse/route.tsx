import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { cv, job } = await req.json();

    if (!cv || !job) {
      return NextResponse.json({ error: 'Missing CV or Job description' }, { status: 400 });
    }

    const prompt = `
You are a professional CV rewriting assistant.
Given the following CV and job description:

---CV---
${cv}

---Job Description---
${job}

1. Provide a short bullet-point overview of how well this CV matches the job.
2. Rewrite the CV in Markdown format, optimizing it for this role. Maintain a professional tone.

Your response should include:
- A section titled 'Match Overview'
- A section titled 'Optimized CV (Markdown)'
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ result: content });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
