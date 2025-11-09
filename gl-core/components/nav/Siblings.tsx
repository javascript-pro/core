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

// --- helper functions ---
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

function findParent(items: NavItem[], slug: string): NavItem | null {
  for (const item of items) {
    if (item.children?.some((c) => c.slug === slug)) return item;
    if (item.children) {
      const deeper = findParent(item.children, slug);
      if (deeper) return deeper;
    }
  }
  return null;
}

function findParentContents(items: NavItem[], slug: string): NavItem[] | null {
  for (const item of items) {
    if (item.children?.length) {
      const matchIndex = item.children.findIndex((c) => c.slug === slug);
      if (matchIndex !== -1) return item.children;
      const deeper = findParentContents(item.children, slug);
      if (deeper) return deeper;
    }
  }
  return null;
}

// --- main component ---
export default function Siblings() {
  const pathname = usePathname();
  const router = useRouter();

  const currentNode = React.useMemo(
    () => findNode(globalNav as NavItem[], pathname),
    [pathname],
  );

  const getAncestors = React.useCallback(
    (slug: string): NavItem[] => {
      const chain: NavItem[] = [];
      let parent = findParent(globalNav as NavItem[], slug);
      while (parent) {
        chain.unshift(parent); // insert at start
        parent = findParent(globalNav as NavItem[], parent.slug);
      }
      return chain;
    },
    [],
  );

  const ancestors = React.useMemo(
    () => (currentNode ? getAncestors(currentNode.slug) : []),
    [currentNode, getAncestors],
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
      return contents.length
        ? [...contents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        : null;
    } else {
      const parentContents = findParentContents(globalNav as NavItem[], pathname);
      return parentContents
        ? [...parentContents].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        : null;
    }
  }, [currentNode, pathname, isIndexPage]);

  if (!siblings || siblings.length === 0) return null;

  return (
    <Box>
      {/* Ancestor chain */}
      {ancestors.map((node) => (
        <ListItemButton key={node.slug} onClick={() => router.push(node.slug)}>
          <ListItemIcon>
            <Icon icon="up" color="primary" />
          </ListItemIcon>
          <ListItemText primary={node.title} />
        </ListItemButton>
      ))}

      {/* Current level siblings */}
      <List dense disablePadding>
        {siblings.map((item) => {
          const isCurrent = item.slug === pathname;
          return (
            <ListItemButton
              key={item.slug}
              disabled={isCurrent}
              onClick={() => !isCurrent && router.push(item.slug)}
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
