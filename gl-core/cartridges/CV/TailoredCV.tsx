'use client';
import React from 'react';
import { Box } from '@mui/material';
// import { Icon, useIsMobile } from '../';

export type TTailoredCV = {
  markdown: string | null;
};

export default function TailoredCV({ markdown = null }: TTailoredCV) {
  return (
    <Box>
      <pre>markdown: {JSON.stringify(markdown, null, 2)}</pre>
      TailoredCV
    </Box>
  );
}
