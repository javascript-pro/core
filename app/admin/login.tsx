// app/admin/login.tsx
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.refresh(); // Reloads the page so auth state is rechecked
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded border p-8 shadow">
      <h1 className="mb-4 text-xl font-bold">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full rounded border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <a href="https://goldlabel.pro" className="underline">
          Back to goldlabel.pro
        </a>
      </p>
    </div>
  );
}
