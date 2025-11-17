// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { useUser, UserCard } from '../../Paywall';

export default function User() {
  const user = useUser();

  if (!user) return null;

  return (
    <Box sx={{ p: 0 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <UserCard />
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      {/* <List>
        <ListItemButton onClick={() => setConfirmOpen(true)}>
          <ListItemIcon>
            <Icon icon="signout" />
          </ListItemIcon>
          <ListItemText secondary="Sign Out" />
        </ListItemButton>
      </List> */}
    </Box>
  );
}
