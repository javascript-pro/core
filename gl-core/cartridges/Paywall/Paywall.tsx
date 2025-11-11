// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';

import * as React from 'react';
import { IconButton, Button } from '@mui/material';
import { Icon, useDispatch } from '../../../gl-core';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { usePaywall, DialogPaywall, setPaywallKey } from '../Paywall';

export default function Paywall() {
  const dispatch = useDispatch();
  const pw = usePaywall();

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
        variant="contained"
        startIcon={<Icon icon="paywall" />}
        onClick={handleClick}
        sx={{
          zIndex: (theme) => theme.zIndex.modal - 3,
          position: 'fixed',
          top: 8,
          right: 8,
        }}
      >
        Account
      </Button>
    </>
  );
}
