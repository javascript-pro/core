'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx

import * as React from 'react';
import config from '../../config.json';
import { Box } from '@mui/material';
import { TBouncer } from '../Bouncer';
import { Authed, AuthForm, Feedback, useUser } from '../Bouncer';
import { Theme, useDispatch } from '../../../gl-core';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { updateUser } from '../Bouncer';

export default function Bouncer({ frontmatter = null }: TBouncer) {
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
            })
          );
        } else {
          dispatch(updateUser(null));
        }
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Theme theme={config.themes.bouncer as any}>
      <Feedback />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
          px: 2,
        }}
      >
        {user ? (
          <Authed frontmatter={frontmatter} />
        ) : (
          <AuthForm frontmatter={frontmatter} />
        )}
      </Box>
    </Theme>
  );
}
