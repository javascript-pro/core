'use client';

import * as React from 'react';
import { useLoading } from '../../../gl-core';
import { Box, CircularProgress, Backdrop } from '@mui/material';

export default function LoadingOverlay() {
  const loading = useLoading();
  if (!loading) return null;

  return (
    <Backdrop
      open={true}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );
}
