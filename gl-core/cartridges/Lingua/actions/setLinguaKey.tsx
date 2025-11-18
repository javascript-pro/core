// /Users/goldlabel/GitHub/core/gl-core/cartridges/Lingua/actions/setLinguaKey.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const setLinguaKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.lingua;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(setUbereduxKey({ key: 'lingua', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
