'use client';
import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useIsLoading } from '../../../gl-core'


export default function LoadingOverlay({ 
  // message = 'Doing shit...'
}: { message?: string }) {

  const isLoading = useIsLoading();
  if (!isLoading) return null;

  return (
    <Backdrop
      open
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        color: '#fff',
        flexDirection: 'column',
      }}
    >
      <CircularProgress color="inherit" />
      {/* <Typography variant="body1" sx={{ mt: 2 }}>
        {message}
      </Typography> */}
    </Backdrop>
  );
}
