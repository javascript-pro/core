// /Users/goldlabel/GitHub/core/gl-core/cartridges/Pings/usePings.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../cartridges/Uberedux';

export function usePings() {
  return useSelector((state: TRootState) => state.redux.pings);
}
