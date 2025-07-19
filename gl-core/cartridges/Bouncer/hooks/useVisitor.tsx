// core/gl-core/cartridges/Bouncer/hooks/useVisitor.tsx

/*
    Hook returning the user from bouncer slice 
*/
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useVisitor() {
  return useSelector((state: TRootState) => state.redux.bouncer.visitor);
}
