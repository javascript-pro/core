'use client';

import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Icon } from '../../';

export interface IAuthButton {
  anyKey?: any;
}

export default function AuthButton() {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        disabled
        onClick={() => {
          console.log('auth');
        }}
      >
        <Icon icon={'auth' as any} />
      </IconButton>
    </Box>
  );
}
