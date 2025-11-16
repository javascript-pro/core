// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/SignOut.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { useUser, setPaywallKey, usePaywall } from '../../Paywall';

export default function SignOut() {
  const dispatch = useDispatch();
  const user = useUser();
  const paywall = usePaywall();

  

  return (
    <Box sx={{ }}>
      sign out
    </Box>
  );
}
