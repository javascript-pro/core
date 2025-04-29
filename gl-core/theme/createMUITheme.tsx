import config from '../config.json';
import { createTheme } from '@mui/material';
import {TTheme} from '../';

const mode = 'light';
const theme = config.themes.light;


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
      // success: {
      //   main: theme.secondary,
      // },
      // info: {
      //   main: theme.text,
      // },
      background: {
        default: theme.background,
        paper: theme.paper,
      },
      text: {
        primary: theme.text,
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
  });
}
