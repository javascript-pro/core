'use client';
import config from '../../config.json';
import * as React from 'react';
import {
  Box,
  Avatar,
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Fab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PopupMenu, Header } from '../../';
import { useKey } from '../../cartridges/Uberedux';

const StyledFab = styled(Fab)({
  position: 'absolute',
  margin: '0 auto',
  zIndex: 1000,
  top: -4,
  left: 0,
  right: 0,
});


export type IAppshell = {
  children?: React.ReactNode;
  globalNav?: any;
};

export default function Appshell({ children, globalNav }: IAppshell) {
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

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <PopupMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        globalNav={globalNav}
      />

      <Header
        meta={{
          // title: config.appTitle,
          // description: config.description,
        }}
      />

      <Container maxWidth="md" sx={{ mt: '80px' }}>
        <Box sx={{ pb: '50px' }}>
          {children && <Box sx={{ p: 0 }}>{children}</Box>}
        </Box>
      </Container>

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
              sx={{
                boxShadow: 0,
                background: 0,
              }}
              onClick={handleToggleMenu}
              aria-label="Goldlabel Menu"
            >
              <Avatar
                alt="Icon"
                src={darkmode ? config.favicon.dark : config.favicon.light}
              />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
