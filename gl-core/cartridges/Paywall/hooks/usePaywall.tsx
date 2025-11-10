// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/hooks/usePaywall.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function usePaywall() {
  return useSelector((state: TRootState) => state.redux.paywall);
}
