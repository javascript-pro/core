// core/gl-core/cartridges/Lingua/hooks/useLingua.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useLingua() {
  return useSelector((state: TRootState) => state.redux.lingua);
}
