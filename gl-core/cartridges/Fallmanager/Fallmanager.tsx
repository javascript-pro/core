'use client';
import * as React from 'react';
import config from './fallmanager.json';
import { AppBar, CssBaseline, Paper } from '@mui/material';
import { Theme } from '../../../gl-core';
import { StickyHeader, Uploads } from '../Fallmanager';
import { usePathname } from 'next/navigation';

export default function Fallmanager() {
  const pathname = usePathname();
  const views: Record<string, React.ReactNode> = {
    '/fallmanager': <Uploads />,
  };

  const view = views[pathname] ?? <Uploads />;

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
