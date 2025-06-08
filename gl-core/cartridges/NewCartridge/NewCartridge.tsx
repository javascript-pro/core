'use client';
// core/gl-core/cartridges/NewCartridge/NewCartridge.tsx
import * as React from 'react';
import { TNewCartridge } from './types';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, navigateTo, Icon } from '../../../gl-core';

export default function NewCartridge({ payload = null }: TNewCartridge) {
  const dispatch = useDispatch();

  const handleCartridgeHome = () => {
    console.log('NewCartridge payload', payload);
    dispatch(navigateTo('/cartridges/new-cartridge'));
  };

  return (
    <>
      <Box sx={{ p: 1, border: '1px solid red' }}>
        <Typography variant="h6">NewCartridge</Typography>
        <Icon icon="home" />
        <Button variant="contained" onClick={handleCartridgeHome}>
          Cartridge Home
        </Button>
      </Box>
    </>
  );
}
