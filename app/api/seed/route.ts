// app/api/seed/route.ts
import { db } from '#/lib/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
  const appsRef = collection(db, 'apps');
  const pagesRef = collection(db, 'pages');

  await Promise.all([
    setDoc(doc(appsRef, 'mp3-to-text'), {
      name: 'MP3 to Text',
      description: 'Upload a podcast and get a summary.',
      url: 'https://mp3-to-text.vercel.app',
      featured: true,
      createdAt: serverTimestamp(),
      createdBy: 'dev-seed',
    }),

    setDoc(doc(pagesRef, 'about'), {
      title: 'About',
      description: 'About Goldlabel',
      content:
        'Goldlabel Apps Ltd builds fast, real-world tools with a strong design system.',
      updatedAt: serverTimestamp(),
      lastUpdatedBy: 'dev-seed',
    }),
  ]);

  return NextResponse.json({ status: 'seeded' });
}
