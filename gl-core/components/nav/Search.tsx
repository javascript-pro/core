'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  styled,
  alpha,
  InputBase,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import { useDispatch, routeTo, Icon } from '../../../gl-core';
import globalNav from '../../../public/globalNav.json';
import { useRouter } from 'next/navigation';

export type TSearch = {
  onTrigger?: (value: any) => void;
};

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
}));

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.1)
      : alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.15)
        : alpha(theme.palette.common.black, 0.08),
  },
  width: '100%',
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
    width: '16ch',
    '&:focus': {
      width: '24ch',
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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const flatItems = useMemo(() => flattenNav(globalNav), []);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    // When query is empty → return all pages
    if (!q) return flatItems;
    return flatItems.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(q) ||
        description?.toLowerCase().includes(q),
    );
  }, [query, flatItems]);

  const handleFocus = () => setOpen(true);
  const handleClickAway = (e: MouseEvent | TouchEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <SearchWrapper ref={wrapperRef}>
        <SearchField>
          <SearchIconWrapper>
            <Icon icon="search" color="primary" />
          </SearchIconWrapper>
          <StyledInputBase
            onFocus={handleFocus}
            onChange={(e) => {
              setQuery(e.target.value);
              onTrigger(e);
            }}
            value={query}
            placeholder="Search for…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchField>

        {open && results.length > 0 && (
          <Paper
            elevation={6}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              mt: 0.5,
              zIndex: 1300,
              width: '100%',
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            <List dense disablePadding>
              {results.map((item, i) => (
                <ListItemButton
                  key={`search_result_${i}`}
                  onClick={() => {
                    dispatch(routeTo(item.slug, router));
                    setOpen(false);
                    setQuery('');
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </SearchWrapper>
    </ClickAwayListener>
  );
}
