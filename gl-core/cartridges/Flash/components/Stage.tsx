// /app/src/Flash/components/Stage.tsx
import React from 'react';
import { Box } from '@mui/material';
import { Logo, Pingpong } from '../../Flash';
import { TStage } from '../types';

export default React.forwardRef<HTMLDivElement, TStage>(function Stage(
  { movie, width, height },
  ref,
) {
  /*
    Conditionally show the correct movie according
    to the movie prop
  */
  let m: React.ReactNode = null;

  switch (movie) {
    case 'Logo':
      m = <Logo id="movie_logo" />;
      break;
    case 'Pingpong':
      m = <Pingpong id="movie_pingpong" />;
      break;
    default:
      m = null;
  }

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
      {m}
      {/* For debugging: */}
      {/* <pre>movie: {JSON.stringify(movie, null, 2)}</pre> */}
    </Box>
  );
});
