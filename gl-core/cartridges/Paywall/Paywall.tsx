// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';

import * as React from 'react';
import { Box, Button } from '@mui/material';
import { Icon, useDispatch } from '../../../gl-core';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useUser, DialogPaywall, setPaywallKey, UserCard } from '../Paywall';

export default function Paywall() {
  const dispatch = useDispatch();
  const user = useUser();
  // console.log("user", user)

  // Subscribe to Firebase auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      dispatch(setPaywallKey('user', user));
      dispatch(setPaywallKey('authed', !!user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleClick = () => {
    dispatch(setPaywallKey('dialogOpen', true));
  };

  return (
    <>
      <DialogPaywall />

      {user ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <UserCard />
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      ) : null}
    </>
  );
}

/*
Sign in

<Button
  endIcon={<Icon icon="paywall" />}
  onClick={handleClick}
  sx={{
    zIndex: (theme) => theme.zIndex.modal - 3,
    position: 'fixed',
    top: 16,
    right: 16,
  }}
>
  Paywall
</Button>
*/
