'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useGlobalNav, Icon, routeTo, useDispatch } from '../../../../gl-core';

type NavItem = {
  title?: string;
  slug?: string;
  icon?: string;
  excerpt?: string;
  children?: NavItem[];
};

function normalizeSlug(slug?: string): string {
  if (!slug) return '/';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

function findBySlug(items: NavItem[], slug: string): NavItem | null {
  if (!Array.isArray(items)) return null;
  const target = normalizeSlug(slug);
  for (const item of items) {
    if (normalizeSlug(item.slug) === target) return item;
    if (Array.isArray(item.children)) {
      const found = findBySlug(item.children, slug);
      if (found) return found;
    }
  }
  return null;
}

export default function PrevNext({
  prev,
  next,
}: {
  prev?: string;
  next?: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const globalNav = useGlobalNav();
  const items: NavItem[] = Array.isArray(globalNav)
    ? globalNav
    : globalNav
      ? [globalNav]
      : [];

  if (!prev && !next) return null;

  const prevItem = prev ? findBySlug(items, prev) : null;
  const nextItem = next ? findBySlug(items, next) : null;

  const handlePrev = () => prev && dispatch(routeTo(prev, router));
  const handleNext = () => next && dispatch(routeTo(next, router));

  return (
    <Paper variant='outlined' sx={{}}>
      <List
        disablePadding
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
        }}
      >
        {prev && (
          <ListItemButton onClick={handlePrev}>
            <ListItemIcon sx={{}}>
              <Icon icon="left" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight={600}>
                  {prevItem?.title || 'Previous'}
                </Typography>
              }
            />
          </ListItemButton>
        )}

        {next && (
          <ListItemButton onClick={handleNext}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  textAlign="right"
                >
                  {nextItem?.title || 'Next'}
                </Typography>
              }
            />
            <ListItemIcon sx={{ ml: 2 }}>
              <Icon icon="right" />
            </ListItemIcon>
          </ListItemButton>
        )}
      </List>
    </Paper>
  );
}
