// /Users/goldlabel/GitHub/ella/next/src/gl-core/cartridges/System/subMUITheme.tsx
import { createTheme } from '@mui/material'

export type TTheme = {
  primary: string
  secondary: string
  background: string
  paper: string
  text: string
  border: string
}

const fallback: TTheme = {
  primary: '#1976d2',
  secondary: '#9c27b0',
  background: '#ffffff',
  paper: '#f5f5f5',
  text: '#000000',
  border: '#e0e0e0',
}

export function subMUITheme(t: Partial<TTheme> | undefined) {
  const theme = { ...fallback, ...(t ?? {}) }

  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: theme.primary,
      },
      secondary: {
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
          subtitle1: { color: theme.primary },
          subtitle2: { color: theme.primary },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: { color: theme.border },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: theme.primary },
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
          root: { color: theme.primary },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: theme.primary, // always primary
          },
        },
      },
    },
  })
}
