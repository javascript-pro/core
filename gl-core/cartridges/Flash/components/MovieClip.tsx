'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TMovieClip = {
  id: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
};

export default function MovieClip({ 
  id, 
  children, 
  width = 320,
  height = 320,
}: TMovieClip) {
  return (
    <Box
      id={id}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        opacity: 0,
      }}
    >
      {children}
    </Box>
  );
}
