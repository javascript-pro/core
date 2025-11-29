// core/gl-core/cartridges/DesignSystem/DesignSystem.tsx
'use client';
import * as React from 'react';
import { TTheme, IDesignSystem } from './types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  useMUITheme,
  SystemDialog,
  Feedback,
  PushButton,
  LoadingOverlay,
} from '../DesignSystem';

export default function DesignSystem({
  theme,
  children = null,
}: IDesignSystem) {
  const newtheme = useMUITheme(theme as TTheme);

  return (
    <ThemeProvider theme={newtheme}>
      <CssBaseline />
      <LoadingOverlay />
      <Feedback />
      <SystemDialog />
      {children}
      <PushButton />
    </ThemeProvider>
  );
}
