import config from '../../config.json';
import { createTheme } from '@mui/material';

export function createMUITheme(themeMode: 'light' | 'dark') {
  const mode = themeMode;
  const theme = config.themes[themeMode];

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
      divider: theme.border,
      background: {
        default: theme.background,
        paper: theme.paper,
      },
      text: {
        primary: theme.text,
        secondary: theme.primary,
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
          subtitle1: {
            color: theme.primary,
          },
          subtitle2: {
            color: theme.primary,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: theme.primary,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: theme.primary,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: theme.primary,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: theme.primary,
          },
        },
      },
    },
  });
}
