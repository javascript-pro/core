'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { Share, LightDarkToggle } from '../../';
import { AuthButton } from '../../cartridges/Auth';

export interface IHeaderActions {
  anyKey?: any;
}

export default function HeaderActions() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AuthButton />
      <Share />
      <LightDarkToggle mode="iconbutton" />
    </Box>
  );
}
