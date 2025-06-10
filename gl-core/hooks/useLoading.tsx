// core/gl-core/hooks/useLoading.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../gl-core/types';

export function useLoading() {
  return useSelector((state: TRootState) => state.redux.feedback);
}
