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

function findBySlug(items: NavItem[], slug: string): NavItem | null {
  for (const item of items) {
    if (item.slug === slug) return item;
    if (item.children) {
      const found = findBySlug(item.children, slug);
      if (found) return found;
    }
  }
  return null;
}

function cleanExcerpt(excerpt?: string): string {
  if (!excerpt) return '';
  return excerpt.replace(/\[[^\]]+\]/g, '').replace(/\s+/g, ' ').trim();
}

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

  const currentItem = findBySlug(items, slug);
  const children = currentItem?.children || [];

  if (children.length === 0) return null;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <List disablePadding>
        {children.map((child) => (
          <ListItemButton
            key={child.slug}
            onClick={() => router.push(child.slug as string)}
          >
            {child.icon && (
              <ListItemIcon>
                <Icon icon={child.icon as any} color="primary" />
              </ListItemIcon>
            )}
            <ListItemText
              primary={child.title}
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  sx={{ pr: 2 }}
                >
                  {cleanExcerpt(child.excerpt)}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
