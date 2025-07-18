'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import globalNav from '../../../public/globalNav.json';

type NavItem = {
  title: string;
  slug: string;
  order?: number;
  type?: string;
  children?: NavItem[];
};

function findParentAndSiblings(
  items: NavItem[],
  slug: string
): NavItem[] | null {
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      // check if any child matches
      const foundChild = item.children.find((c) => c.slug === slug);
      if (foundChild) {
        // return siblings (all children of this parent)
        return item.children;
      }
      // otherwise search deeper
      const deeper = findParentAndSiblings(item.children, slug);
      if (deeper) return deeper;
    }
    // if this item itself matches, no siblings because no parent context
  }
  return null;
}

export default function Siblings() {
  const pathname = usePathname();
  const siblings = React.useMemo(() => {
    const arr = findParentAndSiblings(globalNav as unknown as NavItem[], pathname);
    if (!arr) return [];
    // filter out the current page itself
    const filtered = arr.filter((item) => item.slug !== pathname);
    // sort by order
    return filtered.sort((a, b) => {
      const ao = a.order ?? 0;
      const bo = b.order ?? 0;
      return ao - bo;
    });
  }, [pathname]);

  return (
    <Box sx={{ border: '1px solid pink', mx: 4, mt: 3 }}>
      <pre>{JSON.stringify(siblings, null, 2)}</pre>
    </Box>
  );
}
