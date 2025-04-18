'use client';

import * as React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '../';
import globalNav from '../../public/globalNav.json';

type NavItem = {
  title?: string;
  slug?: string;
  description?: string;
  type?: string;
  children?: NavItem[];
};

function findFolderBySlug(items: NavItem[], pathname: string): NavItem | null {
  for (const item of items) {
    const fullPath = `/${item.slug}`.replace(/\/+/g, '/');
    if (fullPath === pathname && item.type === 'folder') {
      return item;
    }
    if (item.children) {
      const found = findFolderBySlug(item.children, pathname);
      if (found) return found;
    }
  }
  return null;
}

function findParentOfItem(
  items: NavItem[],
  pathname: string,
  parents: NavItem[] = [],
): NavItem | null {
  for (const item of items) {
    const fullPath = `/${item.slug}`.replace(/\/+/g, '/');
    if (fullPath === pathname) {
      return parents[parents.length - 1] || null;
    }
    if (item.children) {
      const found = findParentOfItem(item.children, pathname, [
        ...parents,
        item,
      ]);
      if (found) return found;
    }
  }
  return null;
}

export default function FolderContents() {
  const pathname = usePathname();
  const router = useRouter();

  const folder = findFolderBySlug(globalNav, pathname);
  const parent = folder || findParentOfItem(globalNav, pathname);
  const grandparent = parent
    ? findParentOfItem(globalNav, `/${parent.slug}`)
    : null;

  const itemsToRender = parent?.children || [];
  const currentPath = pathname.replace(/\/+/g, '/');

  return (
    <Box sx={{ minWidth: 300 }}>
      {itemsToRender.length === 0 ? null : (
        <List dense>
          {/* Up button to grandparent folder, if it exists */}
          {grandparent && (
            <ListItem key="up" disablePadding>
              <ListItemButton
                onClick={() => router.push(`/${grandparent.slug}`)}
              >
                <ListItemIcon>
                  <Icon icon="up" />
                </ListItemIcon>
                <ListItemText primary={'Up'} />
              </ListItemButton>
            </ListItem>
          )}

          {/* Children items, excluding current file */}
          {itemsToRender
            .filter(
              (item) => `/${item.slug}`.replace(/\/+/g, '/') !== currentPath,
            )
            .map((item) => (
              <ListItem key={item.slug} disablePadding>
                <ListItemButton onClick={() => router.push(`/${item.slug}`)}>
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  );
}
