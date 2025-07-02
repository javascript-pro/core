'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import navJSON from '../../../public/globalNav.json';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from '@mui/material';
import { useDispatch, routeTo } from '../../../gl-core';

function normalizeSlug(slug: string) {
  if (!slug) return '/';
  return slug.endsWith('/') && slug.length > 1 ? slug.slice(0, -1) : slug;
}

function findCurrentNavNode(pathname: string, node: any): any | null {
  if (normalizeSlug(node.slug) === normalizeSlug(pathname)) return node;
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const found = findCurrentNavNode(pathname, child);
      if (found) return found;
    }
  }
  return null;
}

export default function IndexNav() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const currentNode = findCurrentNavNode(pathname, navJSON[0]);
  const children = currentNode?.children || [];

  const displayItems = children.map((child: any) => ({
    title: child.title,
    slug: child.slug,
    description: child.description || '',
    image: child.image || '', // can be empty if not present
  }));

  const handleClick = (slug: string) => {
    dispatch(routeTo(slug, router));
  };

  return (
    <Grid container spacing={2}>
      {displayItems.map((item, index) => {
        console.log('item', item);
        return (
          <Grid
            size={{
              md: 4,
            }}
            key={index}
          >
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardActionArea
                component="a"
                onClick={() => {
                  handleClick(item.slug);
                }}
                sx={{ height: '100%' }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'cover', borderBottom: '1px solid #eee' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
