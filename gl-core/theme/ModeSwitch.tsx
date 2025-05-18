'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon, useSlice, useDispatch, setUbereduxKey } from '../../gl-core';

export default function ModeSwitch() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { themeMode } = slice;

  const handleToggle = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    dispatch(setUbereduxKey({ key: 'themeMode', value: newMode }));
  };

  return (
    <ListItemButton onClick={handleToggle}>
      <ListItemIcon>
        <Icon icon={themeMode === 'dark' ? 'lightmode' : ('darkmode' as any)} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1">
            {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
