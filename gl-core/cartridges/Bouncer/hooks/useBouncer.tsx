// core/gl-core/cartridges/Bouncer/hooks/useBouncer.tsx
/*
    Hook returning the bouncer slice from Uberedux 
    (state redux.bouncer)
*/

import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useBouncer() {
  return useSelector((state: TRootState) => state.redux.bouncer);
}
