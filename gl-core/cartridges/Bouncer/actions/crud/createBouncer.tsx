// core/gl-core/cartridges/Bouncermanager/actions/crud/createBouncer.tsx
import { TUbereduxDispatch } from '../../../../../gl-core/types';
import { setUbereduxKey } from '../../../../../gl-core';

export const createBouncer =
  (fbId = 'abcd-1234-mnbv-0987', title = 'New Bouncer Title'): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('createBouncer', fbId, title);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
