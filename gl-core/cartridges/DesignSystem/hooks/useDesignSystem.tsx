// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/hooks/useDesignSystem.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useDesignSystem() {
  return useSelector((state: TRootState) => state.redux.designSystem);
}
