// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/hooks/useFlash.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useFlash() {
  return useSelector((state: TRootState) => state.redux.flash);
}
