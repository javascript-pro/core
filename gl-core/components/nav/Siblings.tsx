// core/gl-core/components/nav/Siblings.tsx
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

// Find node by slug
function findNode(items: NavItem[], slug: string): NavItem | null {
  for (const item of items) {
    if (item.slug === slug) return item;
    if (item.children) {
      const found = findNode(item.children, slug);
      if (found) return found;
    }
  }
  return null;
}

// Find parent node
function findParent(items: NavItem[], slug: string): NavItem | null {
  for (const item of items) {
    if (item.children && item.children.some((c) => c.slug === slug)) {
      return item;
    }
    if (item.children) {
      const deeper = findParent(item.children, slug);
      if (deeper) return deeper;
    }
  }
  return null;
}

// Find parent folder contents (same-level items)
function findParentContents(items: NavItem[], slug: string): NavItem[] | null {
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      const matchIndex = item.children.findIndex((c) => c.slug === slug);
      if (matchIndex !== -1) {
        return item.children;
      }
      const deeper = findParentContents(item.children, slug);
      if (deeper) return deeper;
    }
  }
  return null;
}

export default function Siblings() {
  const pathname = usePathname();
  const router = useRouter();

  const currentNode = React.useMemo(
    () => findNode(globalNav as NavItem[], pathname),
    [pathname],
  );

  const parentNode = React.useMemo(
    () => (currentNode ? findParent(globalNav as NavItem[], pathname) : null),
    [currentNode, pathname],
  );

  const isIndexPage = React.useMemo(() => {
    if (!currentNode) return false;
    return (
      currentNode.slug === '/' ||
      currentNode.slug.endsWith('/index') ||
      (currentNode.children && currentNode.children.length > 0)
    );
  }, [currentNode]);

  const siblings = React.useMemo(() => {
    if (!currentNode) return null;

    if (isIndexPage) {
      const contents = currentNode.children || [];
      if (contents.length === 0) return null;
      return [...contents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } else {
      const parentContents = findParentContents(
        globalNav as NavItem[],
        pathname,
      );
      if (!parentContents) return null;
      return [...parentContents].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
    }
  }, [currentNode, pathname, isIndexPage]);

  if (!siblings || siblings.length === 0) return null;

  return (
    <Box>
      {parentNode && (
        <ListItemButton onClick={() => router.push(parentNode.slug)}>
          <ListItemIcon>
            <Icon icon={'up'} color="primary" />
          </ListItemIcon>
          <ListItemText primary={parentNode.title} />
        </ListItemButton>
      )}

      <List dense disablePadding>
        {siblings.map((item) => {
          const isCurrent = item.slug === pathname;
          return (
            <ListItemButton
              key={item.slug}
              disabled={isCurrent}
              onClick={() => {
                if (!isCurrent) router.push(item.slug);
              }}
            >
              <ListItemIcon>
                <Icon icon={item.icon as any} color="primary" />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
