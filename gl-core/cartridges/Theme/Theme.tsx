// core/gl-core/cartridges/Theme/Theme.tsx
'use client';

import * as React from 'react';
import { TTheme } from '../Theme/types';
import { ThemeProvider } from '@mui/material';
import { subMUITheme } from '../Theme';

export default function Theme({ theme, children = null }: TTheme) {
  const newtheme = subMUITheme(theme);
  return <ThemeProvider theme={newtheme}>{children}</ThemeProvider>;
}
