// ella/next/src/gl-core/cartridges/System/System.tsx
'use client';
import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  subMUITheme,
  useSystem,
  setSystemKey,
  useConfig,
  useDispatch,
} from '../../Flash';

type TSystemProps = {
  children?: React.ReactNode;
};

export default function System({ children = null }: TSystemProps) {
  const dispatch = useDispatch();
  const { themeMode } = useSystem();
  const { themes } = useConfig();

  // Listen for system color scheme changes
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const applySystemColor = (isDark: boolean) => {
      const newMode = isDark ? 'dark' : 'light';
      dispatch(setSystemKey('themeMode', newMode));
    };

    // Initial set if not already defined
    if (!themeMode) {
      applySystemColor(mq.matches);
    }

    // Update whenever system changes
    const handler = (e: MediaQueryListEvent) => applySystemColor(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, [themeMode, dispatch]);

  // Pick theme safely
  const theme = themes[themeMode ?? 'light']; // fallback
  const newTheme = subMUITheme(theme);

  return (
    <ThemeProvider theme={newTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
