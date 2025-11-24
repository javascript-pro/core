// /Users/goldlabel/GitHub/core/gl-core/cartridges/Uberedux/hooks/useBySlug.tsx
'use client';

import { useMemo } from 'react';
import globalNav from '../../../../public/globalNav.json';

/**
 * useBySlug
 * Returns the nav item matching the slug, or null
 */
export function useBySlug(slug: string) {
  return useMemo(() => {
    if (!slug) return null;

    function find(list: any[]): any | null {
      for (const item of list) {
        const full = item.slug?.startsWith('/') ? item.slug : `/${item.slug}`;
        if (full === slug) return item;

        if (item.children?.length) {
          const child = find(item.children);
          if (child) return child;
        }
      }
      return null;
    }

    return find(globalNav as any[]) ?? null;
  }, [slug]);
}
