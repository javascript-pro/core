// /Users/goldlabel/GitHub/flash/app/src/Flash/hooks/useRedux.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../types';

export function useRedux() {
  return useSelector((state: TRootState) => state.redux);
}
