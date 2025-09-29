// core/gl-core/cartridges/Theme/components/ModeSwitch.tsx
'use client';

import * as React from 'react';
import {
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {
  Icon,
  useSlice,
  useDispatch,
  setUbereduxKey,
} from '../../../../gl-core';

export default function ModeSwitch() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { themeMode } = slice;

  // resolve system preference if null
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const effectiveMode = themeMode ?? (prefersDark ? 'dark' : 'light');

  const handleToggle = () => {
    const newMode = effectiveMode === 'dark' ? 'light' : 'dark';
    dispatch(setUbereduxKey({ key: 'themeMode', value: newMode }));
  };

  return (
    <MenuItem onClick={handleToggle}>
      <ListItemIcon>
        <Icon
          color="primary"
          icon={effectiveMode === 'dark' ? 'lightmode' : ('darkmode' as any)}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1">
            {effectiveMode === 'dark' ? 'Light mode' : 'Dark mode'}
          </Typography>
        }
      />
    </MenuItem>
  );
}
