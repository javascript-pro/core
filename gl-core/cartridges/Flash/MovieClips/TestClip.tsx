'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';

export type TTestClip = {
  slug: string | null;
};

export default function TestClip({ 
  slug = null
}: TTestClip) {

    return (
      <Box sx={{
        border: "1px solid gold",
        background: "rgba, 255, 255, 255, 0.25",
        width: 200,
        height: 200,
      }}>

        <pre>slug: {JSON.stringify(slug, null, 2)}</pre>

        <Typography variant="body2" color="text.secondary">
          TestClip
        </Typography>
      </Box>
    );  
}
