// /Users/goldlabel/GitHub/core/gl-core/hooks/useGlobalNav.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../cartridges/Uberedux';

export function useGlobalNav() {
  return useSelector((state: TRootState) => state.redux.globalNav);
}
