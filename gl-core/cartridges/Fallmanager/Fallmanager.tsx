'use client';
import * as React from 'react';
import config from './config.json';
import {
  AppBar,
  CssBaseline,
  Paper,
  Toolbar,
} from '@mui/material';
import { Theme } from '../../../gl-core';
import {
  StickyHeader,
  Dashboard,
  NewCase,
  ViewCases,
  Uploads,
  UploadFile,
} from '../Fallmanager';
import { usePathname } from 'next/navigation';

export default function Fallmanager() {

  const pathname = usePathname();
  const views: Record<string, React.ReactNode> = {
    '/fallmanager/dashboard': <Dashboard />,
    '/fallmanager/cases': <ViewCases />,
    '/fallmanager/cases/new': <NewCase />,
    '/fallmanager/uploads': <Uploads />,
    '/fallmanager/uploads/new': <UploadFile />,
  };

  const view = views[pathname] ?? <Dashboard />;

  return (
    <Theme theme={config.theme as any}>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          boxShadow: 0,
          pb: 1,
        }}
      >
        <Toolbar>
          <StickyHeader />
        </Toolbar>
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
