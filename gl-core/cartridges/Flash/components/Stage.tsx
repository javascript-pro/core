'use client';

import * as React from 'react';
import { Box, useTheme } from '@mui/material';
import { Pingpongball } from '../../Flash';
// import defaultMovie from '../actionscript/default_movie';
import { pingpongball } from '../../Flash';

export type TStageProps = {
  movie?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  loop?: boolean;
  [key: string]: any;
};

export default function Stage({
  movie = 'default_movie',
  width = 300,
  height = 200,
  color = 'dodgerblue',
  loop = false,
  ...rest
}: TStageProps) {
  // console.log('height', height)

  const shapeRef = React.useRef<SVGCircleElement | null>(null);
  const theme = useTheme();
  React.useEffect(() => {
    if (!shapeRef.current) return;

    let tl: gsap.core.Timeline | undefined;

    switch (movie) {
      case 'pingpongball':
      default:
        tl = pingpongball({
          target: shapeRef.current,
          color,
          loop,
        });
        break;
    }

    return () => {
      tl?.kill();
    };
  }, [movie, color, loop]);

  return (
    <Box
      sx={{
        my: 2,
        height: 300,
        bgcolor: theme.palette.background.paper,
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...rest}
    >
      <Pingpongball ref={shapeRef} />
    </Box>
  );
}
