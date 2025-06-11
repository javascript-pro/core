// core/gl-core/hooks/useThemeMode.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../../types';

export function useThemeMode() {
  return useSelector((state: TRootState) => state.redux.themeMode);
}
