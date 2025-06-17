// core/gl-core/cartridges/SelectLang/actions/updateKey.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const updateKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.lingua;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(setUbereduxKey({ key: 'newcartridge', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
