// core/gl-core/cartridges/Bouncer/actions/updateUser.ts
import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../../gl-core';
import { TUser } from '../types';

export const updateUser =
  (user: TUser | null): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const currentBouncer = getState().redux.bouncer;
      const updated = {
        ...currentBouncer,
        user: user === null ? null : { ...user },
      };

      dispatch(setUbereduxKey({ key: 'bouncer', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
