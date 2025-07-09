// core/app/api/gl-api/fallmanager/ki/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../../gl-core/lib/firebaseAdmin';
import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const systemPrompt = `
You are an expert legal assistant working in a German law firm that handles car accident claims. 
You help extract structured case data from legal documents. Your job is to return valid JSON that matches 
the expected format of the law firm’s software. You must also provide short summaries of the case in English and German.
`;

const userPrompt = `
The following is the full text of a car accident-related legal document. Read the text carefully and extract any and all relevant structured data that could help populate a legal case record.

Return valid JSON with the following structure:

{
  "clientName": "",
  "carRegistration": "",
  "dateOfAccident": "",
  "placeOfAccident": "",
  "insuranceCompany": "",
  "policyNumber": "",
  "claimNumber": "",
  "policeReportNumber": "",
  "witnesses": [""],
  "opposingInsurance": "",
  "opposingPolicyNumber": "",
  "opposingDriverName": "",
  "opposingVehicleDetails": "",
  "summary": {
    "en": "",
    "de": ""
  },
  "contacts": [
    {
      "name": "",
      "role": "",
      "address": "",
      "phone": "",
      "email": ""
    }
  ]
}

Guidelines:

- Leave values as empty strings if not found.
- \`witnesses\` should always be an array (possibly empty).
- The \`summary\` field must be a short, tweet-length (max 280 characters) summary of the document content, written in both English (\`en\`) and German (\`de\`).
- The \`contacts\` array should include all identifiable people or organisations with any available contact info: names, addresses, phone numbers, and emails. Common examples include clients, lawyers, witnesses, opposing parties, insurers, garages, or police officers.
- The \`role\` field in each contact should indicate their presumed role in the case (e.g. "client", "lawyer", "witness", etc).

Do not include anything else in the response.

Below is the document text:
`;

export async function GET() {
  return NextResponse.json({ error: 'Use POST method only' }, { status: 405 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body?.id;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid ID' },
        { status: 400 },
      );
    }

    const docRef = adminDb.collection('files').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 },
      );
    }

    const data = docSnap.data();
    const rawText = data?.rawText || data?.docData?.rawText || '';
    const prompt = `${userPrompt.trim()}\n\n${rawText.trim()}`;

    // Set processing + prompt
    await docRef.update({
      openai: {
        processing: true,
      },
      updatedAt: Date.now(),
    });

    const openaiRes = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
          temperature: 0.2,
        }),
      },
    );

    const result = (await openaiRes.json()) as {
      error?: { message?: string };
      choices?: { message?: { content?: string } }[];
    };

    if (!openaiRes.ok) {
      const error = result?.error?.message || 'OpenAI error';
      await docRef.update({
        openai: { error },
        updatedAt: Date.now(),
      });
      return NextResponse.json({ error }, { status: openaiRes.status });
    }

    const content = result?.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      const error = 'Invalid OpenAI response format';
      await docRef.update({
        openai: { error },
        updatedAt: Date.now(),
      });
      return NextResponse.json({ error }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      const error = 'Failed to parse OpenAI JSON output';
      await docRef.update({
        openai: { error },
        updatedAt: Date.now(),
      });
      return NextResponse.json({ error }, { status: 500 });
    }

    await docRef.update({
      openai: parsed,
      updatedAt: Date.now(),
    });

    return NextResponse.json({ ok: true, id, docData: parsed });
  } catch (error) {
    const fallbackError =
      error instanceof Error ? error.message : 'Unknown error';

    try {
      const body = await req.json();
      const id = body?.id;
      if (typeof id === 'string') {
        await adminDb
          .collection('files')
          .doc(id)
          .update({
            openai: { error: fallbackError },
            updatedAt: Date.now(),
          });
      }
    } catch (e) {
      console.error('🔥 Fallback write failed:', e);
    }

    console.error('🔥 Error:', error);
    return NextResponse.json({ error: fallbackError }, { status: 500 });
  }
}
