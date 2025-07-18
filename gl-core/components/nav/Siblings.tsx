'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import globalNav from '../../../public/globalNav.json';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { Icon } from '../../../gl-core';

type NavItem = {
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  children?: NavItem[];
};

function findSiblings(items: NavItem[], slug: string): NavItem[] | null {
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      const childIndex = item.children.findIndex((c) => c.slug === slug);
      if (childIndex !== -1) {
        return item.children;
      }
      const deeper = findSiblings(item.children, slug);
      if (deeper) return deeper;
    }
    if (item.slug === slug) {
      return null;
    }
  }
  return null;
}

export default function Siblings() {
  const pathname = usePathname();
  const router = useRouter();

  const siblings = React.useMemo(() => {
    const arr = findSiblings(globalNav as NavItem[], pathname);
    if (!arr) return null;

    // filter out current page AND any index pages
    const filtered = arr.filter((item) => {
      const isCurrent = item.slug === pathname;
      const isIndex =
        item.slug.endsWith('/index') ||
        item.slug === pathname.substring(0, pathname.lastIndexOf('/')) || // parent path
        item.slug === '/'; // root index
      return !isCurrent && !isIndex;
    });

    if (filtered.length === 0) return null;
    return [...filtered].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [pathname]);

  if (!siblings) return null;

  return (
    <Box>
      <List dense disablePadding>
        {siblings.map((item) => (
          <ListItemButton
            key={item.slug}
            onClick={() => router.push(item.slug)}
          >
            <ListItemIcon>
              <Icon icon={item.icon as any} />
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              secondary={item.description || undefined}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
