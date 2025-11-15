// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/UserCard.tsx
'use client';
import * as React from 'react';
import { Box, Avatar, Typography, ButtonBase } from '@mui/material';
import { useUser, setPaywallKey } from '../../Paywall';
import { useDispatch, Icon } from '../../../../gl-core';

export default function UserCard() {
  const dispatch = useDispatch();
  const user = useUser();

  const handleClick = () => {
    dispatch(setPaywallKey('dialogOpen', true));
  };

  if (!user) return null;

  const provider = user.providerData?.[0];
  const displayName = user.displayName || provider?.displayName || '';
  const email = user.email || provider?.email || '';
  const photoURL = user.photoURL || provider?.photoURL || '';

  const providerId = provider?.providerId;
  const fallbackIcon =
    providerId === 'google.com'
      ? 'google'
      : providerId === 'github.com'
        ? 'github'
        : 'user';

  const showFallback = !photoURL;

  return (
    <ButtonBase sx={{ textAlign: 'left' }} onClick={handleClick}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {showFallback ? (
          <Avatar sx={{ width: 48, height: 48, mr: 2, borderRadius: 2 }}>
            <Icon icon={fallbackIcon} />
          </Avatar>
        ) : (
          <Avatar
            src={photoURL}
            sx={{ width: 48, height: 48, mr: 2, borderRadius: 2 }}
          />
        )}

        <Box>
          <Typography variant="h6">{displayName}</Typography>
          <Typography variant="body2" color="text.primary">
            {email}
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
}
