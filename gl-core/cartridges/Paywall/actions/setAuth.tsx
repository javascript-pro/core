// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/actions/setAuth.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../';
import type { User } from 'firebase/auth';

export const setAuth =
  (authed: boolean, user?: User | null): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const current = getState().redux.paywall;
      const updated = {
        ...current,
        authed,
        user: authed ? user : null,
      };
      dispatch(setUbereduxKey({ key: 'paywall', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
