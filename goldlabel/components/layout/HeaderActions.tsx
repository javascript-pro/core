'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import {
  Share,
  LightDarkToggle,
  // Featured,
} from '../../';
import { LoginBtn } from '../../cartridges/Bouncer';

export interface IHeaderActions {
  anyKey?: any;
}

export default function HeaderActions() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Share />
      <LightDarkToggle />
      <LoginBtn />
    </Box>
  );
}
