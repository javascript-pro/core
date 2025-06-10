'use client';
// core/gl-core/cartridges/Bouncer/Bouncer.tsx

import * as React from 'react';
import config from '../../config.json';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { Box, Card, CardHeader } from '@mui/material';
import { Theme, useDispatch, Core } from '../../../gl-core';
import { AuthForm, useUser, updateUser } from '../Bouncer';

export default function Bouncer({
  frontmatter = null,
  content = null,
  slug = null,
  children = null,
}: any) {
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

  const getAuthForm = () => {
    return (
      <Theme theme={theme as any}>
        <AuthForm frontmatter={frontmatter} content={content} />
      </Theme>
    );
  };
  return (
    <Box sx={!user ? sxAuth : null}>
      {user ? (
        slug === 'admin' ? (
          <Core frontmatter={frontmatter} body={content} />
        ) : (
          getAuthForm()
        )
      ) : (
        getAuthForm()
      )}
    </Box>
  );
}
