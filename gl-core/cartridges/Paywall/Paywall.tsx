// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';

import * as React from 'react';
import { Box, Avatar, IconButton } from '@mui/material';
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
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClick} color="primary">
            <Icon icon={'paywall'} />
          </IconButton>
        </Box>
      )}
    </>
  );
}
