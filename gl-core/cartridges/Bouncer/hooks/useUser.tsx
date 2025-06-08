// core/gl-core/cartridges/Bouncer/hooks/useUser.tsx

/*
    Hook returning the user from bouncer slice 
*/
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useUser() {
  return useSelector((state: TRootState) => state.redux.bouncer.user);
}
