// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/hooks/useFeedback.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useFeedback() {
  return useSelector((state: TRootState) => state.redux.designSystem.feedback);
}
