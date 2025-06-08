// core/gl-core/cartridges/NewCartridge/hooks/useNewCartridge.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useNewCartridge() {
  return useSelector((state: TRootState) => state.redux.newcartridge);
}
