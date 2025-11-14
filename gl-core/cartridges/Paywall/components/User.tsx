// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { Box, List, Typography, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useUser, userSignout, setPaywallKey } from '../../Paywall';
import { Icon, useDispatch } from '../../../../gl-core';

export default function User() {
  const user = useUser();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(userSignout());
    dispatch(setPaywallKey('dialogOpen', false));
  };

  const handleEmail = () => {
    return false;
  };

  if (!user) return null;

  return (
    <>
      <Box sx={{m: 2}}>
        <Typography variant='h6'>
          Account
        </Typography>
      </Box>
      <List disablePadding>
        <ListItemButton
          onClick={handleEmail}
        >
          <ListItemIcon>
            <Icon icon="email" />
          </ListItemIcon>
          <ListItemText 
            secondary={'Email'}
            primary={user.email}
          />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
              console.log('UID', user.uid);
            }}>
          <ListItemIcon>
            <Icon icon="user" />
          </ListItemIcon>
          <ListItemText 
            secondary={'UID'}
            primary={user.uid}
          />
        </ListItemButton>

        <ListItemButton
          onClick={handleSignout}

        >
          <ListItemIcon>
            <Icon icon="signout" />
          </ListItemIcon>
          <ListItemText 
            primary={'Sign Out'}
          />
        </ListItemButton>
        
      </List>
    </>
  );
}
