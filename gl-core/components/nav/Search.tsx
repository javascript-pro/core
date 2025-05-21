'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  styled,
  alpha,
  InputBase,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Icon } from '../../../gl-core';
import globalNav from '../../../public/globalNav.json';

export type TSearch = {
  onTrigger?: (value: any) => void;
};

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

type FlatItem = {
  title: string;
  slug: string;
  description?: string;
};

function flattenNav(nav: any[], acc: FlatItem[] = []): FlatItem[] {
  for (const item of nav) {
    acc.push({
      title: item.title,
      slug: item.slug,
      description: item.description || '',
    });
    if (item.children) flattenNav(item.children, acc);
  }
  return acc;
}

export default function Search({ onTrigger = () => {} }: TSearch) {
  const [query, setQuery] = useState('');

  const flatItems = useMemo(() => flattenNav(globalNav), []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return flatItems.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(q) ||
        description?.toLowerCase().includes(q),
    );
  }, [query, flatItems]);

  return (
    <Box>
      <SearchField>
        <SearchIconWrapper>
          <Icon icon="search" />
        </SearchIconWrapper>
        <StyledInputBase
          autoFocus
          onChange={(e) => {
            setQuery(e.target.value);
            onTrigger(e);
          }}
          value={query}
          placeholder="Search for…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchField>

      {results.length > 0 && (
        <List dense>
          {results.map((item) => (
            <ListItem key={item.slug} disablePadding>
              <Link
                href={item.slug}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                  sx={{ px: 2, py: 1 }}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
