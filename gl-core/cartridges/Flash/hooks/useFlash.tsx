// /Users/goldlabel/GitHub/flash/app/src/Flash/hooks/useFlash.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../types';

export function useFlash() {
  return useSelector((state: TRootState) => state.redux.flash);
}
