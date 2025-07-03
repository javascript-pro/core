// core/gl-core/cartridges/Fallmanager/actions/saveNewCase.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const saveNewCase =
  (clientName: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('saveNewCase', clientName);
      const current = getState().redux.fallmanager;

      const updated = {
        ...current,
        newCase: {
          ...current.newCase,
          saving: true,
        },
      };

      dispatch(setUbereduxKey({ key: 'fallmanager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
