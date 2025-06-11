'use client';

import * as React from 'react';
import { useLoading, useDispatch, toggleLoading } from '../../../gl-core';
import { Box, CircularProgress, Backdrop, Typography } from '@mui/material';

export default function LoadingOverlay() {
  const loading = useLoading() ?? { status: 'idle', message: '' };
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (loading.status === 'loading') {
  //     const timer = setTimeout(() => {
  //       dispatch(toggleLoading(null));
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [loading.status, dispatch]);

  if (loading.status !== 'loading') return null;

  return (
    <Backdrop
      open={true}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress color="inherit" />
        <Typography variant="body1">{loading.message || 'Loading…'}</Typography>
      </Box>
    </Backdrop>
  );
}
