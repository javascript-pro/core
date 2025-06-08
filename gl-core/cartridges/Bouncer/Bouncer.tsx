'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx

import * as React from 'react';
import { TBouncer } from '../Bouncer';
import config from '../../config.json';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { Box } from '@mui/material';
import { Theme, useDispatch, Core } from '../../../gl-core';
import { AuthForm, Feedback, useUser, updateUser } from '../Bouncer';

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
  };

  const theme = config.themes.dark;

  return (
    <>
      <Feedback />
      <Box sx={!user ? sxAuth : null}>
        {user ? (
          <Core frontmatter={frontmatter} body={content} />
        ) : (
          <Theme theme={theme as any}>
            <AuthForm frontmatter={frontmatter} content={content} />
          </Theme>
        )}
      </Box>
    </>
  );
}
