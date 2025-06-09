// core/gl-core/cartridges/Admin/actions/setSliceKey.tsx

import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export const setSliceKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.admin;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(setUbereduxKey({ key: 'admin', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
