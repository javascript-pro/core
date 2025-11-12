'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function SearchHome() {
  const [q, setQ] = React.useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search/${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="gl-wrap">
      <input
        type="text"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ padding: 8, fontSize: '1rem' }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
