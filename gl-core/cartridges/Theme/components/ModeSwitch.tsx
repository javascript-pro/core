// core/gl-core/cartridges/Theme/components/ModeSwitch.tsx
'use client';

import * as React from 'react';
import {
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
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

  const handleToggle = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    dispatch(setUbereduxKey({ key: 'themeMode', value: newMode }));
  };

  return (
    <MenuItem onClick={handleToggle}>
      <ListItemIcon>
        <Icon icon={themeMode === 'dark' ? 'lightmode' : ('darkmode' as any)} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1">
            {themeMode === 'dark' ? 'Light mode' : 'Dark mode'}
          </Typography>
        }
      />
    </MenuItem>
  );
}
