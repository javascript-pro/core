// core/gl-core/cartridges/Lingua/actions/setFlashKey.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const setFlashKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.flash || {};
      const updated = {
        ...current,
        [key]: value,
      };

      dispatch(setUbereduxKey({ key: 'flash', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
