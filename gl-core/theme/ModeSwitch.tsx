'use client';

import * as React from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { Icon, useSlice, useDispatch, setUbereduxKey } from '../../gl-core';

export default function ModeSwitch() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { themeMode } = slice;

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.checked ? 'dark' : 'light';
    dispatch(setUbereduxKey({ key: 'themeMode', value: newMode }));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Switch checked={themeMode === 'dark'} onChange={handleToggle} />
      <Box sx={{ mr: 1, mt: 0.5 }}>
        <Icon icon={themeMode === 'dark' ? 'lightmode' : ('darkmode' as any)} />
      </Box>
      <Typography variant="body1">
        {themeMode === 'dark' ? 'Swap to Light' : 'Swap to Dark'}
      </Typography>
    </Box>
  );
}
