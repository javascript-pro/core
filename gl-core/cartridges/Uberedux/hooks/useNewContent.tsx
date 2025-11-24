// /Users/goldlabel/GitHub/core/gl-core/cartridges/Uberedux/hooks/useNewContent.tsx
'use client';

import { useMemo } from 'react';
import globalNav from '../../../../public/globalNav.json';

/**
 * useNewContent
 * Returns every nav item whose frontmatter has new: true
 */
export function useNewContent() {
  return useMemo(() => {
    const out: any[] = [];

    function walk(list: any[]) {
      for (const item of list) {
        // if (item['newContent']){
        //   console.log("item", item);
        // }

        if (item?.frontmatter?.newContent === true) {
          out.push(item);
        }
        if (item.children && item.children.length) {
          walk(item.children);
        }
      }
    }

    walk(globalNav as any[]);
    return out.length ? out : null;
  }, []);
}
