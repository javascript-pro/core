// core/app/api/gl-api/flickr/route.ts
import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { apibase } = config;

  return NextResponse.json({
    time: Date.now(),
    endpoint: `${apibase}/openai`,
    description: 'Interacts with OpenAI API',
    verbs: ['GET', 'POST'],
    cv: `${apibase}/openai/cv`,
  });
}
