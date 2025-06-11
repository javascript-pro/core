// core/gl-core/cartridges/Bouncer/actions/firebaseAuth.tsx
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';

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
        if (!creds || !creds.email || !creds.password) {
          dispatch(
            toggleFeedback({
              severity: 'warning',
              title: 'Sign-in failed',
              description: 'Please enter both your email and password before signing in.',
            }),
          );
          return;
        }

        const result = await signInWithEmailAndPassword(
          auth,
          creds.email,
          creds.password,
        );

        dispatch(
          toggleFeedback({
            severity: 'success',
            title: `Welcome back`,
            description: `Signed in as ${result.user.email}`,
          }),
        );

        return;
      }

      if (mode === 'signout') {
        await signOut(auth);

        dispatch(
          toggleFeedback({
            severity: 'info',
            title: 'Signed out',
            description: 'You have been signed out successfully.',
          }),
        );

        return;
      }
    } catch (e: unknown) {
      let friendlyMessage = 'Something went wrong during authentication.';
      let detailedMessage: string;

      if (e instanceof Error) {
        detailedMessage = e.message;

        // Match common Firebase Auth errors
        if (detailedMessage.includes('auth/user-not-found')) {
          friendlyMessage = 'No account found with that email address.';
        } else if (detailedMessage.includes('auth/wrong-password')) {
          friendlyMessage = 'The password entered is incorrect.';
        } else if (detailedMessage.includes('auth/invalid-email')) {
          friendlyMessage = 'The email address format is invalid.';
        } else if (detailedMessage.includes('auth/too-many-requests')) {
          friendlyMessage = 'Too many failed attempts. Please wait a moment and try again.';
        }
      } else {
        detailedMessage = String(e);
      }

      dispatch(
        toggleFeedback({
          severity: 'error',
          title: 'Error',
          description: friendlyMessage,
        }),
      );

      dispatch(setUbereduxKey({ key: 'error', value: detailedMessage }));
    }
  };
