'use client';
// core/gl-core/cartridges/Fallmanager/Fallmanager.tsx
import * as React from 'react';
import { TFallmanager } from './types';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, navigateTo, Icon } from '../../../gl-core';

export default function Fallmanager({ payload = null }: TFallmanager) {
  const dispatch = useDispatch();

  const handleCartridgeHome = () => {
    console.log('Fallmanager payload', payload);
    dispatch(navigateTo('/cartridges/new-cartridge'));
  };

  return (
    <>
      <Box sx={{ p: 1, border: '1px solid red' }}>
        <Typography variant="h6">Fallmanager</Typography>

        <Button variant="contained" onClick={handleCartridgeHome}>
          <Icon icon="home" /> Home
        </Button>
      </Box>
    </>
  );
}
