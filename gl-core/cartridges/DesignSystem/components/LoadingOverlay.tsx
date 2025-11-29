// /Users/goldlabel/GitHub/example-app/gl-core/cartridges/DesignSystem/components/LoadingOverlay.tsx
'use client';
import * as React from 'react';
import { useEffect } from 'react';
import { useLoading, useDispatch } from '../../../../gl-core';
import { Box, CircularProgress, Backdrop } from '@mui/material';
import { toggleLoading } from '../../DesignSystem';

export default function LoadingOverlay() {
  const loading = useLoading();
  const dispatch = useDispatch();

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (loading) {
      // when loading becomes true, start a 5s timeout
      timeout = setTimeout(() => {
        dispatch(toggleLoading(false));
      }, 2500);
    }

    // cleanup timeout when unmounting or when loading changes
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading, dispatch]);

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
