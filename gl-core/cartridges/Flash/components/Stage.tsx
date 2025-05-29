'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TStage = {
  id?: string | null;
  children?: React.ReactNode;
};

export default function Stage({ id = null, children }: TStage) {
  const [offsetStyle, setOffsetStyle] = React.useState({ left: 0 });

  React.useEffect(() => {
    const updateOffset = () => {
      const viewportWidth = window.innerWidth;
      const maxWidth = 1024;
      const shouldOffset = viewportWidth > maxWidth;
      const left = shouldOffset ? (viewportWidth - maxWidth) / 2 : 0;
      setOffsetStyle({ left });
    };

    // Lock page scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return (
    <Box
      id={id || undefined}
      sx={{
        width: '100%',
        maxWidth: 1024,
        height: '100vh',
        position: 'absolute',
        top: 0,
        zIndex: 0,
        boxSizing: 'border-box',
        overflow: 'auto',
        ...offsetStyle,
      }}
    >
      {children}
    </Box>
  );
}
