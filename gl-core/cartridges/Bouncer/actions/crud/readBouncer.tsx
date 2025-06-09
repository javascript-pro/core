// core/gl-core/cartridges/Bouncermanager/actions/crud/readBouncer.tsx
import { TUbereduxDispatch } from '../../../../../gl-core/types';
import { setUbereduxKey } from '../../../../../gl-core';

export const readBouncer =
  (fbId = 'abcd-1234-mnbv-0987', title = 'New Bouncer Title'): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('deleteall', fbId, title);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
