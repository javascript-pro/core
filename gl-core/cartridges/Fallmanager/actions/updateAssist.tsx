// core/gl-core/cartridges/Fallmanager/actions/updateAssist.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const updateAssist =
  (updates: Record<string, any>): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.fallmanager;

      const updated = {
        ...current,
        assist: updates.reset
          ? {
              assisting: false,
              step: 0,
            }
          : {
              ...current.assist,
              ...updates,
            },
      };

      dispatch(setUbereduxKey({ key: 'fallmanager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
