import config from '../config.json';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../gl-core/lib/firebase-admin'; // adjust if no alias

export async function GET(request: NextRequest) {
  try {
    const { app } = config;

    // Fetch all docs from the 'pingpong' collection
    const snapshot = await db.collection('pingpong').get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      time: Date.now(),
      app,
      count: data.length,
      data,
    });
  } catch (err: any) {
    console.error('GET /pingpong error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
