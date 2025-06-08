'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx

import * as React from 'react';
import config from '../../config.json';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Box, Card } from '@mui/material';
import { Theme, useDispatch } from '../../../gl-core';
import { TBouncer } from '../Bouncer';
import { AuthForm, Feedback, useUser, updateUser, SignoutButton } from '../Bouncer';

export default function Bouncer({ 
  frontmatter = null,
  content = null,
}: TBouncer) {
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

  const sxAuth = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    px: 2,
  }

  return (
    <Theme theme={config.themes.bouncer as any}>
      <Feedback />
      <Box sx={!user ? sxAuth : null}>
        {user ? (
          <>
            <SignoutButton />
          </>
        ) : (
          <AuthForm frontmatter={frontmatter} content={content} />
        )}
      </Box>
    </Theme>
  );
}
