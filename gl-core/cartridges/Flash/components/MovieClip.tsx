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
  maxWidth?: number | string | null;
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
  maxWidth = null,
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

  // Apply maxWidth cap only when width is measured (i.e. not manually set)
  const resolvedWidth =
    width !== undefined
      ? width
      : typeof maxWidth === 'number'
        ? Math.min(size.width, maxWidth)
        : size.width;

  return (
    <Box
      id={id}
      sx={{
        border: '1px solid limegreen',
        position: 'absolute',
        width: resolvedWidth,
        height: height ?? size.height,
        opacity,
        top,
        left,
        right,
        bottom,
        ...(maxWidth !== null && { maxWidth }),
        margin: '0 auto',
      }}
    >
      <Box ref={ref} sx={{ display: 'inline-block' }}>
        {children}
      </Box>
    </Box>
  );
}
