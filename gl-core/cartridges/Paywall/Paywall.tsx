// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';

import * as React from 'react';
import { IconButton } from '@mui/material';
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
      <IconButton onClick={handleClick} color="primary">
        <Icon icon="paywall" />
      </IconButton>
    </>
  );
}
