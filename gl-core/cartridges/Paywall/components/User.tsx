// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { IconButton, CardHeader, Box, Avatar, Typography, Chip } from '@mui/material';
import { useUser, useIsUberUser } from '../../Paywall';
import { useIsMobile } from '../../../../gl-core';


export default function User() {
  const user = useUser();
  const isMobile = useIsMobile();
  const isUberUser = useIsUberUser();

  if (!user) {
    return (
      <Box sx={{ p: 2, opacity: 0.6 }}>
        <Typography variant="caption">No user</Typography>
      </Box>
    );
  }

  const provider = user.providerData?.[0] ?? null;
  if (!isMobile){
    return (
      <CardHeader
        avatar={<IconButton sx={{ ml:-2}}>
                  <Avatar src={user.photoURL || provider?.photoURL || undefined} />
                </IconButton>
                }
        title={user.displayName || provider?.displayName || 'Unknown user'}
        subheader={user.email || provider?.email}
        action={
          isUberUser && <Chip label="Uber User" size="small" color="primary" />
        }
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <IconButton sx={{ ml:-1}}>
        <Avatar
          src={user.photoURL || provider?.photoURL || undefined}
          sx={{ width: 24, height: 24 }}
        />
      </IconButton>
    </Box>
  )
}
