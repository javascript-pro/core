// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/Flash.tsx
import React from 'react';
import { Box } from '@mui/material';
import {
  Stage,
} from '../Flash';
import {
  Logo,
} from './movieclips/Logo'

export type TFlashProps = {
  movie?: string;
  width?: number | string;
  height?: number | string;
};

export default function Flash({
  movie = 'default',
  width = '100%',
  height = 300,
}: TFlashProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
      }}
    >
      {/* <pre>movie: {JSON.stringify(movie, null, 2)}</pre>
      <pre>width: {JSON.stringify(width, null, 2)}</pre>
      <pre>height: {JSON.stringify(height, null, 2)}</pre> */}
      <Stage id="stage" width={width} height={height} >      
        <Logo id="flash_logo" />
      </Stage>
    </Box>
  );
}
