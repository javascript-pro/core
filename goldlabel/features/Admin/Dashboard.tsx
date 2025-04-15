'use client';

import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email || '');
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.refresh();
  };

  return (
    <main>
      <h1>Goldlabel Admin</h1>
      <p>
        Signed in as <span>{email}</span>
      </p>
      <button onClick={handleLogout}>Sign Out</button>
    </main>
  );
}
