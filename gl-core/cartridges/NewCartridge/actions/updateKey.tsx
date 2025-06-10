// core/gl-core/cartridges/NewCartridge/actions/updateKey.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const updateKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // console.log('updateKey', key, value);
      const current = getState().redux.newcartridge;
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
