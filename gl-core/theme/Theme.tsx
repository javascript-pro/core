'use client';

import * as React from 'react';
import {
  ThemeProvider,
} from '@mui/material';
import { createMUITheme } from '../';

export type TTheme = {
  theme?: {
    "primary": string
    "secondary": string
    "background": string
    "paper": string
    "text": string
    "border": string
  }
  children: React.ReactNode;
}

export default function Theme({
  children = null,
}: TTheme) {
  const theme = createMUITheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
