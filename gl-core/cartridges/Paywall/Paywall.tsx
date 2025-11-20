// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';

import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Icon, useDispatch } from '../../../gl-core';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useUser, setPaywallKey, UserCard, SignOut } from '../Paywall';
import { setDesignSystemKey } from '../DesignSystem';

export default function Paywall() {
  const dispatch = useDispatch();
  const user = useUser();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      dispatch(setPaywallKey('user', user));
      dispatch(setPaywallKey('authed', !!user));
    });
    return () => unsubscribe();
  }, [dispatch]);

  const openDesignSystem = () => {
    dispatch(
      setDesignSystemKey('dialog', {
        icon: 'paywall',
        title: 'User Authentication',
      }),
    );
  };

  return <>{user && <SignOut />}</>;
}
