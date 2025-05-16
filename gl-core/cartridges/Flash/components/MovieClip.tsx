'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TMovieClip = {
  id: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  maxWidth?: number | string | null;
};

export default function MovieClip({
  id,
  children,
  width = 320,
  height = 320,
  opacity = 1,
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
  maxWidth = null,
}: TMovieClip) {
  return (
    <Box
      id={id}
      sx={{
        position: 'absolute',
        width,
        
        height,
        opacity,
        top,
        left,
        right,
        bottom,
      }}
    >
      {children}
    </Box>
  );
}
