'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TStage = {
  id?: string | null;
  children?: React.ReactNode;
};

export default function Stage({ id = null, children }: TStage) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <Box
      id={id || undefined}
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        boxSizing: 'border-box',
        // border: '10px solid blue',
        overflow: 'auto', // key: allow scrolling of contents
      }}
    >
      {children}
    </Box>
  );
}
