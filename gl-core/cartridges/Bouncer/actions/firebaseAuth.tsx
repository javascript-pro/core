// core/gl-core/cartridges/Bouncer/actions/firebaseAuth.tsx

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setUbereduxKey } from '../../../../gl-core';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { auth } from '../../../lib/firebase';

export const firebaseAuth =
  (
    mode: 'signin' | 'signout',
    creds?: {
      email: string;
      password: string;
    },
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
          creds.password,
        );

        // dispatch(
        //   toggleFeedback({
        //     severity: 'success',
        //     title: `Welcome ${result.user.displayName || result.user.email}`,
        //   }),
        // );
      }

      if (mode === 'signout') {
        await signOut(auth);

        // dispatch(
        //   toggleFeedback({
        //     severity: 'info',
        //     title: 'You have been signed out',
        //   }),
        // );
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);

      // dispatch(
      //   toggleFeedback({
      //     severity: 'error',
      //     title: 'Firebase Error',
      //     description: msg,
      //   }),
      // );

      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
