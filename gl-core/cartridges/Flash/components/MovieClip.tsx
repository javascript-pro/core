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
};

export default function MovieClip({
  id,
  children,
  width,
  height,
  opacity = 1,
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
}: TMovieClip) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box
      id={id}
      sx={{
        position: 'absolute',
        opacity,
        top,
        left,
        right,
        bottom,
        width: width ?? 'auto',
        height: height ?? 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        // border: '1px solid limegreen',
      }}
    >
      <Box ref={ref} sx={{ display: 'inline-block', width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
