'use client';

import * as React from 'react';
import { Box, Avatar } from '@mui/material';

export type TTestClip = {
  slug: string | null;
};

export default function TestClip({ slug = null }: TTestClip) {
  return (
    <Box
      sx={{
        width: 42,
        height: 42,
        background: 'rgba(255, 255, 255, 0.25)',
      }}
    >
      <Avatar src="/svg/pingpong.svg" alt={slug}/>      
    </Box>
  );
}
