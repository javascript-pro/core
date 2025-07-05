// core/gl-core/cartridges/Fallmanager/actions/resetFallmanager.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import { initialState } from '../initialState';

export const resetFallmanager =
  (): any => async (dispatch: TUbereduxDispatch) => {
    try {
      dispatch(setUbereduxKey({ key: 'fallmanager', value: initialState }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
