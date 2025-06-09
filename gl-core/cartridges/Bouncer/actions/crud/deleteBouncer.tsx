// core/gl-core/cartridges/Bouncermanager/actions/crud/deleteBouncer.tsx
import { TUbereduxDispatch } from '../../../../';
import { setUbereduxKey } from '../../../../../gl-core';
import { TBouncer } from '../../types';

export const deleteBouncer = (
    fbId = "abcd-1234-mnbv-0987",
    title = "New Bouncer Title",
): TBouncer =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
        
        console.log("deleteall", fbId, title);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };

