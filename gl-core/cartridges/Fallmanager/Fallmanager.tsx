'use client';

import * as React from 'react';
import config from './config.json';
import { Box, Container, AppBar, CssBaseline, Paper } from '@mui/material';
import { Theme } from '../../../gl-core';
import { useFallmanager, StickyHeader, UploadHandler } from '../Fallmanager';
import { usePathname } from 'next/navigation';

export default function Fallmanager() {
  const pathname = usePathname();
  const slice = useFallmanager();
  return (
    <Theme theme={config.theme as any}>
      <CssBaseline />
      <Container maxWidth="md">
        <AppBar
          position="sticky"
          color="default"
          elevation={1}
          sx={{
            boxShadow: 0,
            background: 'white',
            pb: 1,
          }}
        >
          <StickyHeader />
        </AppBar>

        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            mx: 4,
          }}
        >
          <UploadHandler />
          {/* <pre>slice: {JSON.stringify(slice, null, 2)}</pre> */}
        </Box>
      </Container>
    </Theme>
  );
}
