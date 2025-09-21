'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';

export type TStageProps = {
  movie?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  loop?: boolean;
  [key: string]: any; // for future extensions
};

export default function Stage({
  movie = 'default_movie',
  width = 300,
  height = 200,
  color = 'dodgerblue',
  loop = false,
  ...rest
}: TStageProps) {
  const shapeRef = React.useRef<SVGCircleElement | null>(null);

  React.useEffect(() => {
    if (!shapeRef.current) return;

    // A simple GSAP animation for demo
    const tl = gsap.timeline({
      repeat: loop ? -1 : 0,
      defaults: { duration: 1, ease: 'power1.inOut' },
    });

    tl.to(shapeRef.current, { attr: { r: 50 }, fill: color })
      .to(shapeRef.current, { x: 100 })
      .to(shapeRef.current, { x: 0, attr: { r: 30 } });

    return () => {
      tl.kill();
    };
  }, [movie, color, loop]);

  return (
    <Box
      sx={{
        border: '1px solid gold',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
      }}
      {...rest}
    >
      <Typography variant="subtitle1" gutterBottom>
        Flash Stage — {movie}
      </Typography>

      <svg width={width} height={height} viewBox="0 0 200 100">
        <circle ref={shapeRef} cx="50" cy="50" r="30" fill={color} />
      </svg>
    </Box>
  );
}
