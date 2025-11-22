// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/actions/userSignout.tsx

import { signOut } from 'firebase/auth';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../cartridges/Uberedux';
import { auth } from '../../../../gl-core/lib/firebase';

export const userSignout =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // console.log('userSignout');
      // Sign out from Firebase Auth
      await signOut(auth);

      // Clear Paywall user state
      const current = getState().redux.paywall;
      const updated = {
        ...current,
        user: null,
      };

      dispatch(setUbereduxKey({ key: 'paywall', value: updated }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
