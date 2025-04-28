'use client';
import config from '../../config.json';
import * as React from 'react';
import {
  Box,
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useKey } from '../../../gl-core/cartridges/Uberedux';

export type IAppshell = {
  children?: React.ReactNode;
  meta?: {
    icon?: string;
    title?: string;
    description?: string;
  };
};

export default function Appshell({
  children,
  meta = {
    icon: 'appshell icon',
    title: 'appshell title',
    description: 'appshell desc',
  },
}: IAppshell) {
  const [darkmode] = useKey('darkmode');
  const mode = darkmode ? 'dark' : 'light';
  const themeValues = config.themes[mode];

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: themeValues.primary,
          },
          secondary: {
            main: themeValues.secondary,
          },
          success: {
            main: themeValues.secondary,
          },
          info: {
            main: themeValues.text,
          },
          background: {
            default: themeValues.background,
            paper: themeValues.paper,
          },
          text: {
            primary: themeValues.text,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              containedPrimary: {
                fontWeight: 'bold',
                boxShadow: 'none',
              },
            },
          },
        },
      }),
    [mode, themeValues],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ pt: '70px' }}>
        <Box sx={{ pb: '50px' }}>
          {children && <Box sx={{ p: 0 }}>{children}</Box>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
