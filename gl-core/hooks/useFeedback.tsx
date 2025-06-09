// core/gl-core/cartridges/Bouncer/hooks/useBouncer.tsx
/*
    Hook returning the feedback from root slice 
*/
import { useSelector } from 'react-redux';
import { TRootState } from '../cartridges/Uberedux/store';

export function useFeedback() {
  return useSelector((state: TRootState) => state.redux.feedback);
}
