// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/actions/setUser.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../cartridges/Uberedux';

export const setUser =
  (user: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.paywall;
      const updated = {
        ...current,
        user,
      };
      dispatch(setUbereduxKey({ key: 'paywall', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
