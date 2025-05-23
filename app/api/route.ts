// core/app/api/route.ts
import { 
  // NextRequest, 
  NextResponse,
} from 'next/server';
import { getBase } from './gl-api/getBase';

export async function GET(
  // request: NextRequest
) {

  return NextResponse.json({
    time: Date.now(),
    start: `${getBase()}/api/gl-api/`
  });
}
