'use client';
import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Icon } from '../';
import { AuthButton } from '../cartridges/Auth';

export interface IShare {
  anyKey?: any;
}

export default function Share() {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        disabled
        onClick={() => {
          console.log('Share');
        }}
      >
        <Icon icon={'share' as any} />
      </IconButton>
    </Box>
  );
}
