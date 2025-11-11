// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { Chip, List, ListItem } from '@mui/material';
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
      {/* <Box sx={{mb:3}}>
          <Typography variant='body1'>
            Account
          </Typography>
        </Box> */}
      <List disablePadding>
        <ListItem>
          <Chip
            color="primary"
            label={user.email}
            onClick={handleEmail}
            icon={<Icon icon="email" />}
            variant="filled"
            sx={{ px: 1, flexGrow: 1 }}
          />
        </ListItem>
        <ListItem>
          <Chip
            color="primary"
            label={'UID'}
            onClick={() => {
              console.log('user.uid', user.uid);
            }}
            icon={<Icon icon="user" />}
            variant="filled"
            sx={{ textAlign: 'left', px: 1, flexGrow: 1 }}
          />
        </ListItem>
        <ListItem>
          <Chip
            label={'Sign out'}
            color="primary"
            onClick={handleSignout}
            icon={<Icon icon="signout" />}
            variant="filled"
            sx={{ px: 1, flexGrow: 1 }}
          />
        </ListItem>
      </List>
    </>
  );
}
