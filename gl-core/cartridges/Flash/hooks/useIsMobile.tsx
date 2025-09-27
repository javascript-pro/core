// ella/next/src/gl-core/cartridges/System/hooks/useIsMobile.tsx
/*
    Hook returning whether we're on mobile
    determined by whether MUI size is < "md"
*/
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useIsMobile(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}
