// /Users/goldlabel/GitHub/core/gl-core/cartridges/ContentManager/actions/setContentManagerKey.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const setContentManagerKey =
  (key: string, value: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('setContentManagerKey', key, value);
      const current = getState().redux.contentManager;
      const updated = {
        ...current,
        [key]: value,
      };
      dispatch(setUbereduxKey({ key: 'contentManager', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
