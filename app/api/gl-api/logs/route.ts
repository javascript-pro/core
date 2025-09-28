// /Users/goldlabel/GitHub/core/app/api/gl-api/logs/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '../../../../gl-core/lib/firebaseAdmin';
import { getBase } from '../getBase';

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection('logs')
      .orderBy('updated', 'desc')
      .get();

    const logs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      time: Date.now(),
      base: `${getBase()}/`,
      count: logs.length,
      logs,
    });
  } catch (error: any) {
    console.error('Error fetching logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs', details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, type, description, severity, data } = await request.json();

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: title, type' },
        { status: 400 },
      );
    }

    const now = Date.now();

    const newLog: Record<string, any> = {
      title,
      type,
      severity: severity ?? 'success',
      description: description ?? null,
      created: now,
      updated: now,
    };

    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      newLog.data = data;
    }

    const logRef = await adminDb.collection('logs').add(newLog);

    return NextResponse.json({
      message: 'Log created successfully',
      id: logRef.id,
      ...newLog,
    });
  } catch (error: any) {
    console.error('Error creating log:', error);
    return NextResponse.json(
      { error: 'Failed to create log', details: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required field: id' },
        { status: 400 },
      );
    }

    await adminDb.collection('logs').doc(id).delete();

    return NextResponse.json({
      message: 'Log deleted successfully',
      id,
    });
  } catch (error: any) {
    console.error('Error deleting log:', error);
    return NextResponse.json(
      { error: 'Failed to delete log', details: error.message },
      { status: 500 },
    );
  }
}
