// core/gl-core/cartridges/Bouncer/actions/firebaseAuth.tsx

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../';
import { auth } from '../../../lib/firebase';
import { updateFeedback } from './updateFeedback';

export const firebaseAuth = (
  mode: 'signin' | 'signout',
  creds?: {
    email: string;
    password: string;
  }
): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      if (mode === 'signin') {
        if (!creds?.email || !creds?.password) {
          throw new Error('Email and password are required to sign in');
        }

        const result = await signInWithEmailAndPassword(
          auth,
          creds.email,
          creds.password
        );

        dispatch(
          updateFeedback({
            severity: 'success',
            title: `Welcome ${result.user.displayName || result.user.email}`,
          })
        );
      }

      if (mode === 'signout') {
        await signOut(auth);

        dispatch(
          updateFeedback({
            severity: 'info',
            title: 'You have been signed out',
          })
        );
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);

      dispatch(
        updateFeedback({
          severity: 'error',
          title: 'Firebase Error',
          description: msg,
        })
      );

      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
