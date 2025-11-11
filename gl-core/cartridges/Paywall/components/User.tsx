'use client';
import * as React from 'react';
import moment from 'moment';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Box,
  Chip,
  Avatar,
  Grid,
} from '@mui/material';
import { useUser } from '../../Paywall';
import { Icon } from '../../../../gl-core';

export default function User() {
  const user = useUser();
  if (!user) return null;

  const provider = user.providerData?.[0];
  const emailVerified = user.emailVerified ? 'Verified' : 'Unverified';

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        maxWidth: 420,
        mx: 'auto',
        mt: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <Icon icon="user" />
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {user.email || 'Unknown User'}
          </Typography>
        }
        subheader={
          <Chip
            size="small"
            label={emailVerified}
            color={user.emailVerified ? 'success' : 'warning'}
            sx={{ mt: 0.5 }}
          />
        }
      />

      <Divider />

      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={1.5}>
          {/* UID */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>UID:</strong>
            </Typography>
            <Typography variant="body2" noWrap title={user.uid}>
              {user.uid}
            </Typography>
          </Grid>

          {/* Provider */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Provider:</strong>
            </Typography>
            <Typography variant="body2">
              {provider?.providerId || 'unknown'}
            </Typography>
          </Grid>

          {/* Created At */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Created:</strong>
            </Typography>
            {user.createdAt ? (
              <>
                <Typography variant="body2">
                  {moment(Number(user.createdAt)).fromNow()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {moment(Number(user.createdAt)).format('MMM D, YYYY, HH:mm')}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">Unknown</Typography>
            )}
          </Grid>

          {/* Last Login */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Last Login:</strong>
            </Typography>
            {user.lastLoginAt ? (
              <>
                <Typography variant="body2">
                  {moment(Number(user.lastLoginAt)).fromNow()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {moment(Number(user.lastLoginAt)).format(
                    'MMM D, YYYY, HH:mm',
                  )}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">Unknown</Typography>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            App: {user.appName} | API Key: {user.apiKey?.slice(0, 8)}...
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
