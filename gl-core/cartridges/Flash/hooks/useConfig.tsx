// /Users/goldlabel/GitHub/flash/app/src/Flash/hooks/useConfig.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../types';

export function useConfig() {
  return useSelector((state: TRootState) => state.redux.config);
}
