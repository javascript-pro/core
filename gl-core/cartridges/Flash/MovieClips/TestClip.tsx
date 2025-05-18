'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';

export type TTestClip = {
  slug: string | null;
};

export default function TestClip({ slug = null }: TTestClip) {
  return (
    <Box
      sx={{
        overflow: "hidden",
        border: '5px solid gold',
        borderRadius: 2,
        p: 2,
        background: 'rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* <pre>slug: {JSON.stringify(slug, null, 2)}</pre> */}

      
      <Typography variant="h4" color="text.secondary">
        TestClip
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Test Clip TestTest Clip Test Clip Test Clip Test Clip
      </Typography>
    </Box>
  );
}
