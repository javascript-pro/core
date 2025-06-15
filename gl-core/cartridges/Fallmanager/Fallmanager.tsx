// gl-core/cartridges/Fallmanager/Fallmanager.tsx
'use client';

import * as React from 'react';
import config from './data/config.json';
import { AppBar, CssBaseline, Paper } from '@mui/material';
import { Theme } from '../../../gl-core';
import { StickyHeader, Uploads, UploadEdit, Dashboard } from '../Fallmanager';
import { usePathname } from 'next/navigation';

export default function Fallmanager() {
  const pathname = usePathname();

  let view: React.ReactNode = null;

  if (pathname === '/fallmanager') {
    view = <Dashboard />;
  } else if (pathname === '/fallmanager/uploads') {
    view = <Uploads />;
  } else if (pathname.startsWith('/fallmanager/uploads/')) {
    const slug = pathname.split('/').pop() || '';
    view = <UploadEdit slug={slug} />;
  } else {
    view = <Dashboard />; // fallback
  }

  return (
    <Theme theme={config.theme as any}>
      <CssBaseline />
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

      <Paper
        square
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
        }}
      >
        {view}
      </Paper>
    </Theme>
  );
}
