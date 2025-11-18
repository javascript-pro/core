// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/hooks/useMUITheme.tsx
import { createTheme } from '@mui/material';

export type TMUITheme = {
  [key: string]: any;
};

export function useMUITheme(t: TMUITheme) {
  return createTheme({
    palette: {
      mode: t.mode,
      primary: { main: t.primary },
      secondary: { main: t.secondary },
      success: { main: t.primary },
      info: { main: t.secondary },
      divider: t.border,
      background: {
        default: t.background,
        paper: t.paper,
      },
      text: {
        primary: t.text,
        secondary: t.primary,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
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
          subtitle1: { color: t.primary },
          subtitle2: { color: t.primary },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: t.primary },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
    },
  });
}
