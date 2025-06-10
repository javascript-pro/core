'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx

import * as React from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useDispatch } from '../../../gl-core';
import { AuthForm, useUser, updateUser } from '../Bouncer';

export default function Bouncer({ children = null }: any) {
  const dispatch = useDispatch();
  const user = useUser();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const { uid, email } = firebaseUser;
          dispatch(
            updateUser({
              uid,
              email,
            }),
          );
        } else {
          dispatch(updateUser(null));
        }
      },
    );

    return () => unsubscribe();
  }, [dispatch]);

  if (user) return children;
  return <AuthForm />;
}
