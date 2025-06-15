// core/gl-core/cartridges/Fallmanager/hooks/useNewCaseOpen.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useNewCaseOpen() {
  return useSelector(
    (state: TRootState) => state.redux.fallmanager.newCaseOpen,
  );
}
