// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/hooks/useLoading.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useLoading() {
  return useSelector((state: TRootState) => state.redux.designSystem.loading);
}
