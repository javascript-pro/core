'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export type TGoogleMap = {
  src?: string | null;
};

export default function GoogleMap({ src = null }: TGoogleMap) {
  if (!src) return null;

  return (
    <Box>
      <iframe
        src={src}
        style={{
          border: 0,
          borderRadius: '6px',
        }}
        width="100%"
        height="380"
      />
    </Box>
  );
}
