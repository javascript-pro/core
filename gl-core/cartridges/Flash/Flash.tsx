// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/Flash.tsx
import React from 'react';
import { Box } from '@mui/material';
import { Stage, useFlash } from '../Flash';
import { Logo } from './movieclips/Logo';

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
  const f = useFlash();

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
      <Stage id={movie} width={width} height={height}>
        {/* <pre>f: {JSON.stringify(f, null, 2)}</pre> */}
        <Logo id="flash_logo" />
      </Stage>
    </Box>
  );
}
