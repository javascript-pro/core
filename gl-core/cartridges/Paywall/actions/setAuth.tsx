// core/gl-core/cartridges/Paywall/actions/setLang.tsx

import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';

export const setAuth =
  (authed: boolean): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.paywall;
      const updated = {
        ...current,
        authed,
      };
      dispatch(setUbereduxKey({ key: 'paywall', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
