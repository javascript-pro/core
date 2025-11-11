// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { Box, Chip, List, ListItem } from '@mui/material';
import { useUser } from '../../Paywall';
import { Icon } from '../../../../gl-core';

export default function User() {
  const user = useUser();
  if (!user) return null;

  return (
    <Box>
      <List dense>
        <ListItem>
          <Chip
            onClick={() => {
              console.log('handleClick');
            }}
            icon={<Icon icon="email" color="primary" />}
            variant="filled"
            label={user.email}
            sx={{ p: 1 }}
          />
        </ListItem>
        <ListItem>
          <Chip
            onClick={() => {
              console.log('handleClick');
            }}
            icon={<Icon icon="signout" color="primary" />}
            variant="filled"
            label={'Sign out'}
            sx={{ p: 1 }}
          />
        </ListItem>
      </List>
    </Box>
  );
}
