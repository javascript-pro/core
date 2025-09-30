// /app/src/Flash/components/Stage.tsx
import React from 'react';
import { Box } from '@mui/material';
import { Logo } from '../../Flash'
import { TStage } from '../types';

export default React.forwardRef<HTMLDivElement, TStage>(function Stage(
  { movie, width, height, children },
  ref,
) {
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        maxWidth: width,
        maxHeight: height,
        width: '100%',
        height: '100%',
      }}
    >
      <Logo id="flash_logo" />
      <pre>movie: {JSON.stringify(movie, null, 2)}</pre>
      {children}
    </Box>
  );
});
