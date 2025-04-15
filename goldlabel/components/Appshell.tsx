'use client';

import config from '../config.json';
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
import { PopupMenu } from '../';
import { useKey } from '../features/Uberedux';

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

      <PopupMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        globalNav={globalNav}
      />

      {/* Main Content Area */}
      <Container maxWidth="md" sx={{ }}>
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
              sx={{ 
                boxShadow: 0, 
                border: '2px solid ' + themeValues.border 
              }}
              onClick={handleToggleMenu}
              aria-label="Goldlabel Menu">
              <Avatar src={config.favicon}/>
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </Container>
      </AppBar>

    </ThemeProvider>
  );
}
