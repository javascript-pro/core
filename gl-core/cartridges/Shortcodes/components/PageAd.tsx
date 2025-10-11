// /Users/goldlabel/GitHub/core/gl-core/cartridges/Shortcodes/components/PageAd.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Alert,
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
  if (!Array.isArray(items)) return null;
  for (const item of items) {
    if (item.slug === slug) return item;
    if (Array.isArray(item.children)) {
      const found = findBySlug(item.children, slug);
      if (found) return found;
    }
  }
  return null;
}

function cleanExcerpt(excerpt?: string): string {
  if (!excerpt) return '';
  let cleaned = excerpt.replace(/\[[^\]]+\]/g, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

export default function PageAd({ slug = '/' }: { slug: string }) {
  const globalNav = useGlobalNav() as NavItem[] | NavItem | null;
  const router = useRouter();
  const items: NavItem[] = Array.isArray(globalNav)
    ? globalNav
    : globalNav
      ? [globalNav]
      : [];

  const item = findBySlug(items, slug);

  if (!item) {
    return (
      <Alert severity="info">
        PageAd: no item found for slug <code>{slug}</code>
      </Alert>
    );
  }

  const subheader = cleanExcerpt(item.excerpt);

  const handleClick = () => {
    router.push(item.slug as string);
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <CardHeader
          sx={{
            alignItems: 'flex-start',
          }}
          avatar={
            <Box sx={{ mt: 0.5 }}>
              <Icon icon={item.icon as any} color="primary" />
            </Box>
          }
          title={<Typography variant="h6">{item.title}</Typography>}
          subheader={
            <Typography variant="body2">{`${subheader} ...`}</Typography>
          }
        />
      </CardActionArea>
    </Card>
  );
}
