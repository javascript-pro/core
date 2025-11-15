'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Alert,
  Typography,
  Grid,
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
    if (item.children?.length) {
      const found = findBySlug(item.children, slug);
      if (found) return found;
    }
  }
  return null;
}

function cleanExcerpt(excerpt?: string) {
  if (!excerpt) return '';
  return excerpt
    .replace(/\[[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function PageAd({ slug }: { slug: string }) {
  const router = useRouter();
  const globalNav = useGlobalNav();

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
  const handleClick = () => item.slug && router.push(item.slug);

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <CardHeader
              sx={{ alignItems: 'flex-start' }}
              avatar={
                <Box sx={{ mt: 0.5 }}>
                  <Icon icon={item.icon as any} color="primary" />
                </Box>
              }
              title={<Typography variant="h6">{item.title}</Typography>}
            />
          </Grid>

          {item.image && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <CardContent>
                <CardMedia
                  component="img"
                  src={item.image}
                  height={120}
                  sx={{ objectFit: 'cover', borderRadius: 1 }}
                />
              </CardContent>
            </Grid>
          )}

          <Grid size={{ xs: 12, sm: item.image ? 6 : 12 }}>
            <CardContent>
              <Typography variant="body1">
                {subheader && `${subheader} ...`}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
