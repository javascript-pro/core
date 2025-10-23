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
  background,
  style = {},
}: TMovieClip & {
  zIndex?: number;
  background?: string;
}) {
  return (
    <Box
      id={id}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        opacity,
        zIndex,
        background,
        ...(border && { border: '1px solid gold' }),
        ...style,
      }}
    >
      {children}
    </Box>
  );
}
