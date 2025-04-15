'use client';

import config from '../config.json';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppBreadcrumb, Icon, PopupMenu } from '../';
import { useKey } from '../../lib/useKey';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -8,
  left: 0,
  right: 0,
  margin: '0 auto',
});

type AppshellProps = {
  children?: React.ReactNode;
  globalNav?: any;
};

export default function Appshell({ children, globalNav }: AppshellProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

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
          background: {
            default: themeValues.background,
            paper: themeValues.paper,
          },
          text: {
            primary: themeValues.text,
          },
        },
      }),
    [mode, themeValues],
  );

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          bottom: 'auto',
          boxShadow: 0,
          background: themeValues.background,
        }}
      >
        <Container maxWidth="md">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <AppBreadcrumb />
            <IconButton onClick={() => window.open('/', '_self')}>
              <Avatar
                src={config.favicon}
                sx={{ width: 32, height: 32 }}
                alt="Home"
              />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content Area */}
      <Container maxWidth="md" sx={{ pt: 7 }}>
        <Box sx={{ pb: '50px' }}>
          {children && <Box sx={{ p: 0 }}>{children}</Box>}
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
          background: 0,
        }}
      >
        <Container maxWidth="md">
          <Toolbar>
            <StyledFab
              color="secondary"
              sx={{ boxShadow: 0, border: "2px solid " + themeValues.primary }}
              onClick={handleToggleMenu}
              aria-label="Open Menu"
            >
              <Icon icon="flash" color={"primary"} />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </Container>
      </AppBar>

      <PopupMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        globalNav={globalNav}
      />
    </ThemeProvider>
  );
}
