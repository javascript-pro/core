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
import globalNav from '../../public/globalNav.json';
import {
  NavItem,
  Icon,
} from '../';

export type TMainMenu = {
  folderLabel?: string;
  onSelect?: () => void;
};

export type TMainMenuItem = {
  title?: string;
  slug?: string;
  icon?: string;
  description?: string;
  type?: string;
  children?: TMainMenuItem[];
};

function normalizeSlug(slug?: string) {
  return `/${slug || ''}`.replace(/\/+/g, '/');
}

function findFolderBySlug(items: TMainMenuItem[], pathname: string): TMainMenuItem | null {
  for (const item of items) {
    const fullPath = normalizeSlug(item.slug);
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
  items: TMainMenuItem[],
  pathname: string,
  parents: TMainMenuItem[] = [],
): TMainMenuItem | null {
  for (const item of items) {
    const fullPath = normalizeSlug(item.slug);
    if (fullPath === pathname) {
      return parents[parents.length - 1] || null;
    }
    if (item.children) {
      const found = findParentOfItem(item.children, pathname, [...parents, item]);
      if (found) return found;
    }
  }
  return null;
}

export default function MainNav({
  folderLabel,
  onSelect = () => {}
}: TMainMenu) {
  const pathname = usePathname();
  const router = useRouter();

  const normalizedPath = normalizeSlug(pathname);
  const folder = findFolderBySlug(globalNav, normalizedPath);
  const parent = folder || findParentOfItem(globalNav, normalizedPath);
  const grandparent = parent
    ? findParentOfItem(globalNav, normalizeSlug(parent.slug))
    : null;

  const itemsToRender = parent?.children || [];

  return (
    <Box sx={{}}>
      {grandparent && grandparent.slug && grandparent.slug !== '/' && (
        <ListItem disablePadding>
          <ListItemButton
            disabled={normalizedPath === normalizeSlug(grandparent.slug)}
            onClick={() => {
              if (normalizedPath !== normalizeSlug(grandparent.slug)) {
                router.push(normalizeSlug(grandparent.slug));
                onSelect();
              }
            }}
          >
            <ListItemIcon>
              <Icon icon={grandparent.icon as any} />
            </ListItemIcon>
            <ListItemText secondary={folderLabel || grandparent.title} />
          </ListItemButton>
        </ListItem>
      )}

      {parent && parent.slug && parent.slug !== '/' && (
        <ListItem disablePadding>
          <ListItemButton
            disabled={normalizedPath === normalizeSlug(parent.slug)}
            onClick={() => {
              if (normalizedPath !== normalizeSlug(parent.slug)) {
                router.push(normalizeSlug(parent.slug));
                onSelect();
              }
            }}
          >
            <ListItemIcon>
              <Icon icon={parent.icon as any} />
            </ListItemIcon>
            <ListItemText primary={folderLabel || parent.title} />
          </ListItemButton>
        </ListItem>
      )}

      {itemsToRender.length > 0 && (
        <List dense>
          {itemsToRender
            .filter((item) => normalizeSlug(item.slug) !== normalizedPath && normalizeSlug(item.slug) !== '/cv')
            .map((item) => (
              <NavItem
                key={item.slug}
                icon={item.icon}
                label={item.title}
                sublabel={item.description}
                onClick={() => {
                  router.push(normalizeSlug(item.slug));
                  onSelect();
                }}
              />
            ))}
        </List>
      )}
    </Box>
  );
}
