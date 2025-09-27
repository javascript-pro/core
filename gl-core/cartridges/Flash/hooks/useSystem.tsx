// /Users/goldlabel/GitHub/flash/app/src/Flash/hooks/useSystem.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../types';

export function useSystem() {
  return useSelector((state: TRootState) => state.redux.system);
}
