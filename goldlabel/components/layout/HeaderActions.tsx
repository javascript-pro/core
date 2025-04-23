'use client';

import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Icon } from '../../';

export interface IHeaderActions {
  anyKey?: any;
}

export default function HeaderActions() {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        onClick={() => {
          console.log('ping. pong.');
        }}
      >
        <Icon icon={'pingpong' as any} />
      </IconButton>

      <IconButton
        onClick={() => {
          console.log('ping. pong.');
        }}
      >
        <Icon icon={'pingpong' as any} />
      </IconButton>
      
    </Box>
  );
}
