// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/PaywallChip.tsx
'use client';
import * as React from 'react';
import { Chip, Avatar, IconButton } from '@mui/material';
import { usePaywall } from '../../Paywall';
import {Icon} from '../../../../gl-core';

export default function PaywallChip() {
  const paywall = usePaywall();

  const onClick = () => {
    console.log('paywall', paywall);
  };

  const { authed } = paywall;

  if (!authed) {
    return <IconButton color="primary">
              <Icon icon="admin" /> 
            </IconButton>
  }
  
  return (
    <Chip
      variant="filled"
      onClick={onClick}
      avatar={<Avatar alt={'displayName'} src={'avatarSrc'} />}
      label={'displayName'}
      sx={{
        cursor: 'pointer',
        fontWeight: 500,
        '&:hover': { backgroundColor: 'action.hover' },
      }}
    />
  );
}
