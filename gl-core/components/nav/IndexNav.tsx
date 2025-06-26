'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import navJSON from '../../../public/globalNav.json';
import { Grid } from '@mui/material';
import { Icon } from '../../../gl-core';

function normalizeSlug(slug: string) {
  if (!slug) return '/';
  return slug.endsWith('/') && slug.length > 1 ? slug.slice(0, -1) : slug;
}

function findCurrentNavNode(pathname: string, node: any): any | null {
  if (normalizeSlug(node.slug) === normalizeSlug(pathname)) return node;
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const found = findCurrentNavNode(pathname, child);
      if (found) return found;
    }
  }
  return null;
}

export default function IndexNav() {
  const pathname = usePathname();
  const currentNode = findCurrentNavNode(pathname, navJSON[0]);
  const children = currentNode?.children || [];
  const displayItems = children.map((child: any) => ({
    title: child.title,
    slug: child.slug,
    icon: child.icon,
  }));

  return (
    <Grid container spacing={2}>
      {displayItems.map((item, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </Grid>
      ))}
    </Grid>
  );
}
