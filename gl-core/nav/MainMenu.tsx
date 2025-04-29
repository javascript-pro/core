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

function findFolderBySlug(items: TMainMenuItem[], pathname: string): TMainMenuItem | null {
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
  items: TMainMenuItem[],
  pathname: string,
  parents: TMainMenuItem[] = [],
): TMainMenuItem | null {
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

export default function MainNav({
  onSelect = () => console.log("no onSelect()")
}: TMainMenu) {
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
    <Box sx={{ mt: -1 }}>
      {grandparent && (
        <ListItem disablePadding>
          <ListItemButton
            disabled={pathname === `/${grandparent.slug}`}
            onClick={() => {
              if (pathname !== `/${grandparent.slug}`) {
                router.push(`/${grandparent.slug}`);
                onSelect();
              }
            }}
          >
            <ListItemIcon>
              <Icon icon={grandparent.icon as any} />
            </ListItemIcon>
            <ListItemText secondary={grandparent.title} />
          </ListItemButton>
        </ListItem>
      )}

      {parent && (
        <ListItem disablePadding>
          <ListItemButton
            disabled={pathname === `/${parent.slug}`}
            onClick={() => {
              if (pathname !== `/${parent.slug}`) {
                router.push(`/${parent.slug}`);
                onSelect();
              }
            }}
          >
            <ListItemIcon>
              <Icon icon={parent.icon as any} />
            </ListItemIcon>
            <ListItemText primary={parent.title} />
          </ListItemButton>
        </ListItem>
      )}

      {itemsToRender.length > 0 && (
        <List dense>
          {itemsToRender
            .filter(
              (item) => `/${item.slug}`.replace(/\/+/g, '/') !== currentPath
            )
            .map((item) => (
              <NavItem
                key={item.slug}
                icon={item.icon}
                label={item.title}
                sublabel={item.description}
                onClick={() => {
                  router.push(`/${item.slug}`);
                  onSelect();
                }}
              />
            ))}
        </List>
      )}
    </Box>
  );
}
