// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/useBouncer.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux';

export function useFlash() {
  return useSelector((state: TRootState) => state.redux.flash);
}
