'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import { useSlice, createMUITheme } from '../../../gl-core';
import { subMUITheme } from '../Theme';
import { TTheme } from '../Theme/types';

export default function Theme({
  theme = {
    mode: 'dark',
    primary: '#A6D4D1',
    secondary: '#303030',
    background: '#303030',
    paper: '#303030',
    text: '#FFFFFF',
    border: '#C09F52',
  },
  children = null,
}: TTheme) {
  const slice = useSlice();
  // console.log()
  const newtheme = subMUITheme(theme);
  return <ThemeProvider theme={newtheme}>{children}</ThemeProvider>;
}
