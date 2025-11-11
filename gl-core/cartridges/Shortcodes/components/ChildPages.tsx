// /Users/goldlabel/GitHub/core/gl-core/cartridges/Shortcodes/components/ChildPages.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import { useGlobalNav, Icon } from '../../../../gl-core';

type NavItem = {
  title?: string;
  slug?: string;
  icon?: string;
  excerpt?: string;
  image?: string;
  children?: NavItem[];
};

// --- helpers ---
function findChildren(items: NavItem[], slug: string): NavItem[] {
  for (const item of items) {
    if (item.slug === slug) return item.children || [];
    if (item.children) {
      const found = findChildren(item.children, slug);
      if (found.length > 0) return found;
    }
  }
  return [];
}

function cleanExcerpt(excerpt?: string): string {
  if (!excerpt) return '';
  return excerpt
    .replace(/\[[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// --- component ---
export default function ChildPages({
  slug = '/',
  title,
}: {
  slug: string;
  title?: string;
}) {
  const router = useRouter();
  const globalNav = useGlobalNav() as NavItem[] | NavItem | null;

  const items: NavItem[] = Array.isArray(globalNav)
    ? globalNav
    : globalNav
      ? [globalNav]
      : [];

  // root-level: show top-level pages
  const children = slug === '/' ? items : findChildren(items, slug);

  if (!children || children.length === 0) return null;

  return null;
}
