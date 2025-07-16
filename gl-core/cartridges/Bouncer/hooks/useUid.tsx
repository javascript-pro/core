// core/gl-core/cartridges/Bouncer/hooks/useUid.tsx

/*
    Hook returning the user from bouncer slice 
*/
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useUid() {
  return useSelector((state: TRootState) => state.redux.bouncer.uid);
}
