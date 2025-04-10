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
  Fab,
  Avatar,
  IconButton,
  // Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppBreadcrumb, Icon, PopupMenu } from '#/goldlabel';

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
    success: {
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
  top: -8,
  left: 0,
  right: 0,
  margin: '0 auto',
});

type AppshellProps = {
  children?: React.ReactNode
  globalNav?: any
};

export default function Appshell({ children, globalNav }: AppshellProps) {
  const topAppBarHeight = 50;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

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
        <Container maxWidth="md">
          <Toolbar sx={{justifyContent: 'space-between'}}>
            <IconButton
              onClick={() => {
                window.open ("/", "_self")
              }}>
              <Avatar
                src={config.favicon}
                sx={{ width: 32, height: 32 }}
                alt="Home"
              />
            </IconButton>
            <AppBreadcrumb />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content Area with top padding */}
      <Container maxWidth="md" sx={{ pt: `${topAppBarHeight - 10}px` }}>
        <Box sx={{ pb: '50px' }}>
        {/* <Typography variant='h1'>Typography</Typography> */}
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
        <Container maxWidth="md">
          <Toolbar>
            <StyledFab
              sx={{ boxShadow: 0 }}
              onClick={handleToggleMenu}
              color="primary"
              aria-label="Open Menu"
            >
              
              <Icon icon="menu" color="secondary" />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Pop-up Menu Dialog */}
      <PopupMenu open={menuOpen} onClose={() => setMenuOpen(false)} globalNav={globalNav} />
    </ThemeProvider>
  );
}
