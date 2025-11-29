// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { CardHeader, Box, Avatar, Typography, Chip } from '@mui/material';
import { useUser, useIsUberUser } from '../../Paywall';

export default function User() {
  const user = useUser();
  const isUberUser = useIsUberUser();

  if (!user) {
    return (
      <Box sx={{ p: 2, opacity: 0.6 }}>
        <Typography variant="caption">No user</Typography>
      </Box>
    );
  }

  const provider = user.providerData?.[0] ?? null;

  return (
    <CardHeader
      avatar={<Avatar src={user.photoURL || provider?.photoURL || undefined} />}
      title={user.displayName || provider?.displayName || 'Unknown user'}
      subheader={user.email || provider?.email}
      action={
        isUberUser && <Chip label="Uber User" size="small" color="primary" />
      }
    />
  );
}
