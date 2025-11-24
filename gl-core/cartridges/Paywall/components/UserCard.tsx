// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/UserCard.tsx
'use client';
import * as React from 'react';
import { Avatar, IconButton } from '@mui/material';
import { useUser, usePaywall, setPaywallKey } from '../../Paywall';
import { useDispatch } from '../../../../gl-core';

export default function UserCard() {
  const pw = usePaywall();
  const { dialogOpen } = pw;
  const dispatch = useDispatch();
  const user = useUser();

  const handleClick = () => {
    dispatch(setPaywallKey('dialogOpen', !dialogOpen));
  };

  if (!user) return null;

  const provider = user.providerData?.[0];
  // const displayName = user.displayName || provider?.displayName || '';
  // const email = user.email || provider?.email || '';
  const photoURL = user.photoURL || provider?.photoURL || '';

  // const providerId = provider?.providerId;
  // const fallbackIcon =
  //   providerId === 'google.com'
  //     ? 'google'
  //     : providerId === 'github.com'
  //       ? 'github'
  //       : 'user';

  // const showFallback = !photoURL;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar src={photoURL} sx={{ width: 24, height: 24 }} />
      </IconButton>
    </>
  );
}
