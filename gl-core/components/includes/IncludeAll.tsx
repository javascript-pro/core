'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { Feedback, LoadingOverlay } from './';

export default function IncludeAll() {
  return (
    <Box>
      {/* <pre>status: {JSON.stringify(status, null, 2)}</pre> */}
      <Feedback />
      <LoadingOverlay />
    </Box>
  );
}
