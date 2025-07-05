export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../../gl-core/lib/firebaseAdmin';
import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

type SummaryTranslations = {
  en: string;
  de: string;
  fr: string;
  pt: string;
  zh: string;
};

export interface ParsedDocData {
  clientName: string;
  carRegistration: string;
  dateOfAccident: string;
  placeOfAccident: string;
  insuranceCompany: string;
  policyNumber: string;
  claimNumber: string;
  policeReportNumber: string;
  witnesses: string[];
  opposingInsurance: string;
  opposingPolicyNumber: string;
  opposingDriverName: string;
  opposingVehicleDetails: string;
  summary: SummaryTranslations;
}

interface OpenAIChatResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: {
    message: string;
  };
}

const systemPrompt = `
You are an expert legal assistant working in a German law firm that handles car accident claims. 
You help extract structured case data from legal documents. Your job is to return valid JSON that matches 
the expected format of the law firm’s software. You must also provide a short, tweet-length summary of the 
document’s contents in multiple languages.
`;

const userPrompt = `
The following is the full text of a car accident-related legal document. Read the text and extract all relevant 
data that might help populate a claim record. Return valid JSON shaped like this:

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
    "de": "",
    "fr": "",
    "pt": "",
    "zh": ""
  }
}

Leave values as empty strings if not found. \`witnesses\` should always be an array (possibly empty). 
The \`summary\` field must be a short, tweet-length (max 280 characters) summary of the document content, 
translated into each of the following languages:

- English (\`en\`)
- German (\`de\`)
- French (\`fr\`)
- Portuguese (\`pt\`)
- Chinese (\`zh\`)

Do not include anything else in the response.

Below is the document text:
`;

export async function GET() {
  return NextResponse.json({ error: 'Use POST method only' }, { status: 405 });
}

export async function POST(req: NextRequest) {
  try {
    console.log('✅ POST /api/gl-api/fallmanager/ki called');
    const body = await req.json();
    const id: string = body?.id;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid ID' },
        { status: 400 },
      );
    }

    const docRef = adminDb.collection('AIAssist').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 },
      );
    }

    const docData = docSnap.data() as {
      docData?: { rawText?: string };
    };

    const rawText = docData?.docData?.rawText;

    if (!rawText || typeof rawText !== 'string' || rawText.length < 20) {
      return NextResponse.json(
        { error: 'Missing or invalid rawText' },
        { status: 400 },
      );
    }

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
            { role: 'user', content: `${userPrompt}\n\n${rawText}` },
          ],
          temperature: 0.2,
        }),
      },
    );

    const result = (await openaiRes.json()) as OpenAIChatResponse;

    if (!openaiRes.ok) {
      return NextResponse.json(
        { error: result.error?.message || 'OpenAI error' },
        { status: openaiRes.status },
      );
    }

    const content = result.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid OpenAI response format' },
        { status: 500 },
      );
    }

    let parsed: ParsedDocData;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse OpenAI response' },
        { status: 500 },
      );
    }

    await docRef.update({
      'docData.openai': parsed,
      updatedAt: Date.now(),
    });

    return NextResponse.json({ ok: true, id, docData: parsed });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    console.log('✅ error', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
