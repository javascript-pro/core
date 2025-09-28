// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/useBouncer.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../cartridges/Uberedux';

export function useBouncer() {
  return useSelector((state: TRootState) => state.redux.bouncer);
}
