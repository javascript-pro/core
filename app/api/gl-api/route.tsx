// core/app/api/gl-api/route.ts
import config from './config.json';
import {
  // NextRequest,
  NextResponse,
} from 'next/server';

export async function GET() {
  // request: NextRequest
  const { apibase } = config;

  return NextResponse.json({
    time: Date.now(),
    endpoint: `${apibase}/`,
    // apibase,
    endpoints: [
      {
        flickr: 'http://localhost:3000/api/gl-api/flickr/?album=7210000000',
      },
      {
        openai: 'http://localhost:3000/api/gl-api/openai',
      },
    ],
  });
}
