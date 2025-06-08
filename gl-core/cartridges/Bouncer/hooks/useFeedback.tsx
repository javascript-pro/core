// core/gl-core/cartridges/Bouncer/hooks/useBouncer.tsx
/*
    Hook returning the feedback from bouncer slice 
*/
import { useSelector } from 'react-redux';
import { TRootState } from '../../Uberedux/store';

export function useFeedback() {
  return useSelector((state: TRootState) => state.redux.bouncer.feedback);
}
