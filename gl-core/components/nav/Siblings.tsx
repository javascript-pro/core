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
  Divider,
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
    const arr = findSiblings(globalNav as unknown as NavItem[], pathname);
    if (!arr) return null;
    const filtered = arr.filter((item) => item.slug !== pathname);
    if (filtered.length === 0) return null;
    return [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [pathname]);

  if (!siblings) {
    return null;
  }

  return (
    <Box sx={{}}>
      <List dense disablePadding>
        {siblings.map((item, idx) => (
          <React.Fragment key={item.slug}>
            <ListItemButton onClick={() => router.push(item.slug)}>
              <ListItemIcon>
                <Icon icon={item.icon as any} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
