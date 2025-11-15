// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import { Icon, useDispatch } from '../../../gl-core';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useUser, DialogPaywall, setPaywallKey } from '../Paywall';

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
      <Button
        size="small"
        endIcon={<Icon icon="signin" />}
        onClick={handleClick}
        sx={{
          zIndex: (theme) => theme.zIndex.modal - 3,
          position: 'fixed',
          top: 16,
          right: 16,
        }}
      >
        {!user ? <>Sign In</> : <>{user?.email}</>}
      </Button>
    </>
  );
}
