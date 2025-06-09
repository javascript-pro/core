// core/gl-core/cartridges/Fallmanager/hooks/useFallmanager.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useFallmanager() {
  return useSelector((state: TRootState) => state.redux.fallmanager);
}
