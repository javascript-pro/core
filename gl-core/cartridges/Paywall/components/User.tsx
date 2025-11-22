// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';

import * as React from 'react';
import moment from 'moment';
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Chip,
  Paper,
} from '@mui/material';
import { useUser, useIsUberUser } from '../../Paywall';

export default function User() {
  const user = useUser();
  const isUberUser = useIsUberUser();

  if (!user) {
    return (
      <Box sx={{ p: 2, opacity: 0.6 }}>
        <Typography variant="body2">Not signed in</Typography>
      </Box>
    );
  }

  const provider = user.providerData?.[0] ?? null;

  const created = user.createdAt
    ? moment(Number(user.createdAt)).fromNow()
    : null;

  const lastLogin = user.lastLoginAt
    ? moment(Number(user.lastLoginAt)).fromNow()
    : null;

  return (
    <Paper variant='outlined' sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 3, sm: 2 }}>
          <Avatar
            src={user.photoURL || provider?.photoURL || undefined}
            sx={{ width: 56, height: 56 }}
          />
        </Grid>

        <Grid size={{ xs: 9, sm: 10 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user.displayName || provider?.displayName || 'Unknown user'}
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {user.email || provider?.email}
          </Typography>

          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            {isUberUser && (
              <Chip label="Uber User" size="small" color="primary" />
            )}
          </Box>
        </Grid>
      </Grid>

      <Box>

        {provider?.providerId && (
          <Typography variant="body2">
            <strong>Provider:</strong> {provider.providerId}
          </Typography>
        )}

        {created && (
          <Typography variant="body2">
            <strong>Created:</strong> {created}
          </Typography>
        )}

        {lastLogin && (
          <Typography variant="body2">
            <strong>Last login:</strong> {lastLogin}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
