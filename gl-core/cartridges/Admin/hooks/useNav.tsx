// core/gl-core/cartridges/Admin/hooks/useNav.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useNav() {
  return useSelector((state: TRootState) => state.redux.admin.nav);
}
