// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/hooks/useUser.tsx
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useUser() {
  return useSelector((state: TRootState) => state.redux.paywall.user);
}
