// /Users/goldlabel/GitHub/core/gl-core/hooks/useContent.tsx
'use client';

import * as React from 'react';
import { useGlobalNav } from './useGlobalNav';

export type ContentItem = {
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  icon?: string;
  image?: string;
  tags?: string[];
  order?: number;
  type: 'folder' | 'file';
  children?: ContentItem[];
};

function findAllMatches(
  items: ContentItem[],
  slug: string,
  results: ContentItem[],
) {
  for (const item of items) {
    if (item.slug === slug) results.push(item);
    if (item.children?.length) findAllMatches(item.children, slug, results);
  }
}

export function useContent(slug: string): ContentItem | null {
  const globalNav = useGlobalNav();

  return React.useMemo(() => {
    if (!slug || !globalNav) return null;

    const results: ContentItem[] = [];
    findAllMatches(globalNav as ContentItem[], slug, results);

    // No match
    if (results.length === 0) return null;

    // Duplicate matches → return null to avoid ambiguity
    if (results.length > 1) return null;

    // Exactly one match
    return results[0];
  }, [slug, globalNav]);
}
