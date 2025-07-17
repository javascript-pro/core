// /Users/goldlabel/GitHub/core/app/api/gl-api/auth/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { admin, adminDb } from '../../../../../gl-core/lib/firebaseAdmin';
import { sendInviteEmail } from '../../../../../gl-core/lib/email';

const adminAuth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

export async function POST(req: NextRequest) {
  try {
    const { email, displayName, avatar, accessLevel } = await req.json();

    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'Email is required.' },
        { status: 400 },
      );
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error('Missing NEXT_PUBLIC_APP_URL in environment variables');
      return NextResponse.json(
        {
          status: 'error',
          message: 'Server misconfigured: NEXT_PUBLIC_APP_URL is missing',
        },
        { status: 500 },
      );
    }

    // Create Firebase Auth user
    const userRecord = await adminAuth.createUser({
      email,
      displayName: displayName || '',
      photoURL: avatar || undefined,
    });

    // Build Firestore profile
    const userDoc = {
      uid: userRecord.uid,
      email,
      displayName: displayName || '',
      avatar: avatar || null,
      accessLevel: typeof accessLevel === 'string' ? accessLevel : 'member',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await adminDb.collection('auth').doc(userRecord.uid).set(userDoc);

    // Generate reset link
    const resetLink = await adminAuth.generatePasswordResetLink(email, {
      url: process.env.NEXT_PUBLIC_APP_URL + '/login',
    });

    // Send invite email via Resend
    await sendInviteEmail(email, resetLink, displayName);

    return NextResponse.json(
      {
        status: 'success',
        uid: userRecord.uid,
        user: {
          ...userDoc,
          createdAt: new Date().toISOString(), // send readable time back
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error('Create user error:', err);
    return NextResponse.json(
      { status: 'error', message: err.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
