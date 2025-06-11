'use client';
import * as React from 'react';
import config from './fallmanager.json';
import { AppBar, CssBaseline, Paper } from '@mui/material';
import { Theme } from '../../../gl-core';
import { StickyHeader, Uploads, UploadEdit } from '../Fallmanager';
import { usePathname } from 'next/navigation';

export default function Fallmanager() {
  const pathname = usePathname();

  let view: React.ReactNode = <Uploads />;

  if (pathname === '/fallmanager') {
    view = <Uploads />;
  } else if (pathname.startsWith('/fallmanager/uploads/')) {
    const slug = pathname.split('/').pop() || '';
    view = <UploadEdit slug={slug} />;
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
