// core/gl-core/hooks/useVersion.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../cartridges/Uberedux';

export function useVersion() {
  return useSelector((state: TRootState) => state.redux.version);
}
