// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/SignOut.tsx
'use client';

import * as React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { useUser, setPaywallKey, usePaywall, userSignout } from '../../Paywall';

type TSignout = {
  mode?: 'icon' | 'button' | 'listitem';
};

export default function SignOut({ mode }: TSignout) {
  const dispatch = useDispatch();
  const user = useUser();
  const paywall = usePaywall();

  const handleSignOut = () => {
    dispatch(userSignout());
    dispatch(setPaywallKey('dialogOpen', false));
  };

  if (!user) return null;

  return (
    <IconButton onClick={handleSignOut} color="primary" sx={{}}>
      <Icon icon="signout" />
    </IconButton>
  );
}
