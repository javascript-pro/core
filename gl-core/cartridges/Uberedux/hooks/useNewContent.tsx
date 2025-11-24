// /Users/goldlabel/GitHub/core/gl-core/cartridges/Uberedux/hooks/useNewContent.tsx
'use client';

import { useMemo } from 'react';
import globalNav from '../../../../public/globalNav.json';

/**
 * useNewContent
 * Returns all nav items with newContent: true
 */
export function useNewContent() {
  return useMemo(() => {
    const out: any[] = [];

    function walk(list: any[]) {
      for (const item of list) {
        if (item?.newContent === true) {
          out.push(item);
        }
        if (item.children?.length) walk(item.children);
      }
    }

    walk(globalNav as any[]);

    if (!out.length) return null;

    return out.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, []);
}
