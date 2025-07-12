// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/hooks/useAdminSlice.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useAdminSlice() {
  return useSelector((state: TRootState) => state.redux.admin);
}
