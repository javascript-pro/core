// core/gl-core/cartridges/Bouncer/hooks/useEmail.tsx

/*
    Hook returning the email from bouncer slice 
*/
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useEmail() {
  return useSelector((state: TRootState) => state.redux.bouncer.email);
}
