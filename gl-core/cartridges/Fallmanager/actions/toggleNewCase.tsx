// core/gl-core/cartridges/Fallmanager/actions/toggleNewCase.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const toggleNewCase =
  (open: boolean): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.fallmanager;
      const updated = {
        ...current,
        newCase: {
          ...current.newCase,
          open,
        }
      };
      dispatch(setUbereduxKey({ key: 'fallmanager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
