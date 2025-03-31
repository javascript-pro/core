'use client';

import config from '#/goldlabel/config.json';
import * as React from 'react';
import {
  Box,
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBreadcrumb} from '#/goldlabel';


const { light: themeValues } = config.themes;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: themeValues.primary,
    },
    secondary: {
      main: themeValues.secondary,
    },
    background: {
      default: themeValues.background,
      paper: themeValues.paper,
    },
    text: {
      primary: themeValues.text,
    },
  },
});

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

type AppshellProps = {
  children?: React.ReactNode;
};

export default function Appshell({ children }: AppshellProps) {
  const topAppBarHeight = 64;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: 0,
          bottom: 'auto',
          boxShadow: 0,
          height: topAppBarHeight,
        }}
      >
        <Container maxWidth="sm" sx={{}}>
          <Toolbar>
            <AppBreadcrumb />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content Area with top padding */}
      <Container maxWidth="sm" sx={{ pt: `${topAppBarHeight - 10}px` }}>

          <Box sx={{ pb: '50px' }}>
            {children && <Box sx={{ p: 2 }}>{children}</Box>}
          </Box>
      </Container>

      {/* Bottom AppBar */}
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: 'auto',
          bottom: 0,
          boxShadow: 0,
        }}
      >
        <Container maxWidth="sm">
          <Toolbar>
            <StyledFab 
              sx={{ boxShadow: 0 }}
              onClick={() => window.open('/', '_self')}
              color="primary" aria-label="Home">
              <Avatar
                src={config.favicon}
                sx={{ width: 32, height: 32 }}
                alt="Home"
              />
            </StyledFab>

            <Box sx={{ flexGrow: 1 }} />

            {/* <IconButton
              color="secondary"
              onClick={() => window.open('/', '_self')}
            >
              <HomeIcon />
            </IconButton> */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
