// /Users/goldlabel/GitHub/core/app/search/[query]/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type SearchItem = {
  slug: string;
  title: string;
  description?: string;
  tags?: string[] | string | null;
  content: string;
};

function normalizeTags(tags: SearchItem['tags']): string[] {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string' && tags.trim()) return [tags];
  return [];
}

function getQueryFromParams(params: ReturnType<typeof useParams>): string {
  const raw = params?.query;
  const val = Array.isArray(raw) ? raw[0] : raw;
  return (val ? decodeURIComponent(val) : '').toLowerCase();
}

export default function SearchPage() {
  const params = useParams();
  const query = getQueryFromParams(params);
  const [results, setResults] = React.useState<SearchItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function runSearch() {
      try {
        setLoading(true);
        const res = await fetch('/search-index.json', { cache: 'force-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const index: SearchItem[] = await res.json();

        if (!query) {
          if (!cancelled) setResults([]);
          return;
        }

        const q = query.toLowerCase();

        const matches = index.filter((item) => {
          const tags = normalizeTags(item.tags);
          return (
            item.title?.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            tags.some((t) => t.toLowerCase().includes(q)) ||
            item.content?.toLowerCase().includes(q)
          );
        });

        if (!cancelled) {
          setResults(matches);
          setError(null);
        }
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    runSearch();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="gl-wrap">
      <h1>Search results for “{query}”</h1>

      {loading && <p>Searching…</p>}
      {error && <p className="gl-error">Error: {error}</p>}

      {!loading && !error && results.length === 0 && <p>No matches found.</p>}

      {!loading && !error && results.length > 0 && (
        <ul>
          {results.map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}`} className="gl-link">
                <strong>{r.title}</strong>
                {r.description ? ` — ${r.description}` : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
