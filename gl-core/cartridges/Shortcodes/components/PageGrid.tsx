// /Users/goldlabel/GitHub/core/gl-core/cartridges/Shortcodes/components/PageGrid.tsx
'use client';

import React from 'react';
import { Grid } from '@mui/material';
import { useIsMobile, useGlobalNav } from '../../../../gl-core';
import { StandardCard } from '../../DesignSystem';

type NavItem = {
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  children?: NavItem[];
};

function findNode(
  items: NavItem[] | null | undefined,
  slug: string,
): NavItem | null {
  if (!Array.isArray(items)) return null;

  for (const item of items) {
    if (item.slug === slug) return item;
    if (item.children) {
      const found = findNode(item.children, slug);
      if (found) return found;
    }
  }

  return null;
}

export default function PageGrid({
  pages,
  thumbnails,
}: {
  pages: string;
  thumbnails?: string;
}) {
  const isMobile = useIsMobile();
  const globalNav = useGlobalNav();

  const slugs = React.useMemo(
    () =>
      pages
        ?.split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    [pages],
  );

  const nodes = React.useMemo(() => {
    if (!Array.isArray(globalNav)) return [];
    return slugs.map((slug) => ({
      slug,
      node: findNode(globalNav, slug),
    }));
  }, [slugs, globalNav]);

  const mdSize = React.useMemo(() => {
    const count = nodes.filter((n) => n.node).length;
    return count % 3 === 0 ? 4 : 6;
  }, [nodes]);

  const showThumbs = thumbnails === 'yes';

  return (
    <Grid container spacing={1}>
      {nodes.map(({ slug, node }, i) => {
        if (!node) return null;
        return (
          <Grid
            key={`page_${i}`}
            size={{
              xs: 12,
              md: mdSize,
            }}
          >
            <StandardCard slug={slug} thumbnails={showThumbs} />
          </Grid>
        );
      })}
    </Grid>
  );
}
