'use client';

import * as React from 'react';
import { TTheme } from '../Theme/types';
import { ThemeProvider } from '@mui/material';
import { useSlice, useThemeMode } from '../../../gl-core';
import { subMUITheme } from '../Theme';

export default function Theme({ theme, children = null }: TTheme) {
  const themeMode = useThemeMode();

  console.log('themeMode', themeMode);
  const newtheme = subMUITheme(theme);
  return <ThemeProvider theme={newtheme}>{children}</ThemeProvider>;
}
