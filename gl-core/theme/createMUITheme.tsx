import config from '../config.json';
import { createTheme } from '@mui/material';
// import { TTheme } from '../';

const mode = 'dark';
const theme = config.themes.dark;

export function createMUITheme() {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: theme.primary,
      },
      secondary: {
        main: theme.secondary,
      },
      success: {
        main: theme.primary,
      },
      info: {
        main: theme.secondary,
      },
      background: {
        default: theme.background,
        paper: theme.paper,
      },
      text: {
        primary: theme.text,
        secondary: theme.secondary,
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
      MuiTypography: {
        styleOverrides: {
          h1: { fontWeight: 400 },
          h2: { fontWeight: 400 },
          h3: { fontWeight: 400 },
          h4: { fontWeight: 400 },
          h5: { fontWeight: 400 },
          h6: { fontWeight: 400 },
        },
      },
    },
  });
}
