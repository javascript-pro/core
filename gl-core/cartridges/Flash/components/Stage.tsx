'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TStage = {
  id?: string | null;
  children?: React.ReactNode;
};

export default function Stage({ id = null, children }: TStage) {
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const update = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener('resize', update);

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('resize', update);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <Box
      id={id || undefined}
      sx={{
        width: size.width,
        height: size.height,
        // position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: 0,
        boxSizing: 'border-box',
        // border: '10px solid blue',
      }}
    >
      {children}
    </Box>
  );
}
