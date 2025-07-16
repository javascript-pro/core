// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/actions/setUid.tsx
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const setUid =
  (uid?: string | null): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const currentBouncer = getState().redux.bouncer;

      // Merge current state with new uid (can be undefined, null, or string)
      const updated = {
        ...currentBouncer,
        uid: uid ?? null, // if uid is undefined, store null explicitly
      };

      dispatch(setUbereduxKey({ key: 'bouncer', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
