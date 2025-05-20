// core/app/api/gl-api/flickr/route.ts
import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { app = 'Goldlabel', endpoints, frontend } = config;

  return NextResponse.json({
    time: Date.now(),
    app,
    endpoint: 'gl-api/openai',
    description: 'Interacts with OpenAI API',
    verbs: ['GET', 'POST'],
    cv: 'http://localhost:3000/api/gl-api/openai/cv',
  });
}
