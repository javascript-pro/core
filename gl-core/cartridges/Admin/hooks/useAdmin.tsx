// core/gl-core/cartridges/Admin/hooks/useAdmin.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useAdmin() {
  return useSelector((state: TRootState) => state.redux.admin);
}
