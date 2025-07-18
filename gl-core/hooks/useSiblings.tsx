'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import globalNav from '../../public/globalNav.json';

/**
 * useSiblings
 * Finds siblings of the current route in globalNav.
 * Filters out the current page from the siblings list.
 * Returns null if no siblings.
 */
export function useSiblings() {
  const pathname = usePathname();

  return useMemo(() => {
    if (!pathname) return null;

    function findSiblings(navArray: any[], parentChildren: any[] | null = null): any[] | null {
      for (const item of navArray) {
        const fullSlug = item.slug.startsWith('/') ? item.slug : `/${item.slug}`;

        if (fullSlug === pathname) {
          if (parentChildren && parentChildren.length > 1) {
            const siblings = parentChildren.filter((child) => {
              const slug = child.slug.startsWith('/') ? child.slug : `/${child.slug}`;
              return slug !== pathname;
            });
            return siblings.length > 0 ? siblings.sort((a, b) => {
              const ao = a.order ?? 0;
              const bo = b.order ?? 0;
              return ao - bo;
            }) : null;
          }
          return null;
        }

        if (item.children && item.children.length > 0) {
          const result = findSiblings(item.children, item.children);
          if (result) return result;
        }
      }
      return null;
    }

    return findSiblings(globalNav as any[]) || null;
  }, [pathname]);
}
