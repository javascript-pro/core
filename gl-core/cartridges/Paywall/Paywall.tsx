// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';

import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Icon, useDispatch } from '../../../gl-core';
import {
  usePaywall,
  DialogPaywall,
  setPaywallKey,
} from '../Paywall';

export default function Paywall() {

  const pw = usePaywall();
  const dispatch = useDispatch();

  const handleClick = () => {
    // console.log("pw", pw);
    dispatch(setPaywallKey('dialogOpen', true ));
  }

  return (
    <Box>
      <DialogPaywall />
      <IconButton onClick={handleClick} color="primary">
        <Icon icon="paywall"/>
      </IconButton>
    </Box>
  );
}
