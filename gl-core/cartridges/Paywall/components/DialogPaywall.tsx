// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/DialogPaywall.tsx
'use client';
import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../../gl-core';
import { auth } from '../../../lib/firebase';
import { signOut } from 'firebase/auth';
import { usePaywall, setPaywallKey, Signin } from '../../Paywall';

export default function DialogPaywall() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const pw = usePaywall();
  const { dialogOpen, user } = pw ?? {};

  const handleClose = () => {
    dispatch(setPaywallKey('dialogOpen', false));
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      dispatch(setPaywallKey('user', null));
      dispatch(setPaywallKey('authed', false));
      dispatch(setPaywallKey('dialogOpen', false));
    } catch (err) {
      console.error('[Paywall] Sign-out failed:', err);
    }
  };

  return (
    <Dialog
      open={Boolean(dialogOpen)}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 0,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Icon icon="paywall" />
        </Box>

        <Box>
          <IconButton
            aria-label="Close paywall"
            onClick={handleClose}
            color="primary"
          >
            <Icon icon="close" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {!user ? (
            <>
              <Typography variant="body1" color="text.secondary">
                Sign in please
              </Typography>
              <Signin />
            </>
          ) : (
            <>
              <Typography variant="h6">Account</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {user && (
          <>
            <Button
              size="large"
              sx={{ my: 3 }}
              onClick={handleSignout}
              startIcon={<Icon icon="signout" />}
              variant="outlined"
            >
              Sign Out
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
