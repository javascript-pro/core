// core/gl-core/cartridges/Fallmanager/hooks/useFileTypes.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useFileTypes() {
  return useSelector((state: TRootState) => state.redux.fallmanager.fileTypes);
}
