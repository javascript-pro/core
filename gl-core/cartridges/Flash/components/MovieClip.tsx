'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TMovieClip = {
  id: string;
  children?: React.ReactNode;
};

export default function MovieClip({ id, children }: TMovieClip) {
  return (
    <Box
      id={id}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 250,
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}
