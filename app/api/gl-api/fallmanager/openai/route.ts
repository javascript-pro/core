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

export async function POST(req: NextRequest) {
  console.log('[POST] Received request');

  try {
    const body = await req.json();
    const id = body?.id;
    console.log('[POST] Request body:', body);

    if (!id || typeof id !== 'string') {
      console.warn('[WARN] Missing or invalid ID');
      return NextResponse.json(
        { error: 'Missing or invalid ID' },
        { status: 400 },
      );
    }

    const docRef = adminDb.collection('files').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.warn(`[WARN] Document with ID "${id}" not found`);
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 },
      );
    }

    const data = docSnap.data();
    console.log('[POST] Retrieved Firestore document:', data);

    const rawText = data?.rawText || data?.docData?.rawText || '';
    if (!rawText.trim()) {
      const error = 'No rawText available in document';
      console.warn(`[WARN] ${error}`);
      await docRef.update({ openai: { error }, updatedAt: Date.now() });
      return NextResponse.json({ error }, { status: 400 });
    }

    const prompt = `${userPrompt.trim()}\n\n${rawText.trim().slice(0, 12000)}`;
    console.log('[POST] Composed prompt for OpenAI');

    await docRef.update({
      openai: { processing: true },
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
          temperature: 0.2,
          max_tokens: 1500,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
        }),
      },
    );

    const result = (await openaiRes.json()) as {
      choices?: { message?: { content: string } }[];
      error?: { message?: string };
    };
    console.log('[POST] OpenAI response:', result);

    if (!openaiRes.ok) {
      const error = result.error?.message || 'OpenAI API error';
      console.error('[ERROR] OpenAI responded with error:', error);
      await docRef.update({ openai: { error }, updatedAt: Date.now() });
      return NextResponse.json({ error }, { status: openaiRes.status });
    }

    let content = result?.choices?.[0]?.message?.content;

    if (!content || typeof content !== 'string') {
      const error = 'Missing or invalid OpenAI content';
      console.error('[ERROR] ' + error);
      await docRef.update({ openai: { error }, updatedAt: Date.now() });
      return NextResponse.json({ error }, { status: 500 });
    }

    // Clean up ```json fences
    content = content
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/```$/, '')
      .trim();

    console.log('[POST] Cleaned content from OpenAI:', content);

    if (!content.startsWith('{')) {
      const error = 'OpenAI returned non-JSON content';
      console.error('[ERROR] ' + error, content);
      await docRef.update({
        openai: { error, rawResponse: content },
        updatedAt: Date.now(),
      });
      return NextResponse.json({ error }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      const error = 'Failed to parse OpenAI JSON output';
      console.error('[ERROR] ' + error, err);
      await docRef.update({
        openai: { error, rawResponse: content },
        updatedAt: Date.now(),
      });
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log('[POST] Parsed JSON successfully:', parsed);

    // Filter out Hertwig & Auer contacts
    const isHertwigAuer = (text: string) =>
      /hertwig.*auer/i.test(text) ||
      /bismarckstr\.?\s*122/i.test(text) ||
      /info@hertwig-auer\.de/i.test(text);

    if (Array.isArray(parsed.contacts)) {
      parsed.contacts = parsed.contacts.filter((c) => {
        const fields = [c.name, c.address, c.email].filter(Boolean).join(' ');
        return !isHertwigAuer(fields);
      });
    }

    await docRef.update({
      openai: parsed,
      updatedAt: Date.now(),
    });

    return NextResponse.json({ ok: true, id, docData: parsed });
  } catch (error) {
    const fallbackError =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('[FATAL] Uncaught handler error:', error);

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
      console.error('[FATAL] Fallback write failed:', e);
    }

    return NextResponse.json({ error: fallbackError }, { status: 500 });
  }
}
