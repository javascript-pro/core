// /app/src/Flash/lib/MovieClip.tsx
import React from 'react';
import { Box } from '@mui/material';
import { TMovieClip } from '../types';

export default function MovieClip({
  id,
  children,
  opacity = 1,
  border,
  width = '100%',
  height = '100%',
  zIndex,
  style,
}: TMovieClip & { zIndex?: number }) {
  return (
    <Box
      id={id}
      sx={{
        ...style,
        opacity,
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        zIndex,
        ...(border && { border: '1px solid gold' }),
      }}
    >
      {children}
    </Box>
  );
}
