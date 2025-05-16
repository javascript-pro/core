'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TMovieClip = {
  id: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  opacity?: number;
};

export default function MovieClip({ 
  id, 
  children, 
  width = 320,
  height = 320,
  opacity = 1,
}: TMovieClip) {
  return (
    <Box
      id={id}
      sx={{
        opacity,
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        
      }}
    >
      {children}
    </Box>
  );
}
