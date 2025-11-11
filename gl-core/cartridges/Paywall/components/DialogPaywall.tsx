'use client';
import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { auth } from '../../../lib/firebase';
import { signOut } from 'firebase/auth';
import {
  usePaywall,
  useUser,
  setPaywallKey,
  Signin,
  User,
} from '../../Paywall';

export default function DialogPaywall() {
  const dispatch = useDispatch();
  const pw = usePaywall();
  const { dialogOpen } = pw ?? {};
  const user = useUser();

  const handleClose = () => {
    dispatch(setPaywallKey('dialogOpen', false));
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      dispatch(setPaywallKey('user', null));
      dispatch(setPaywallKey('authed', false));
      handleClose();
    } catch (err) {
      console.error('[Paywall] Sign-out failed:', err);
    }
  };

  return (
    <Dialog
      open={Boolean(dialogOpen)}
      onClose={handleClose}
      fullScreen
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        {user ? (
          <User />
        ) : (
          <>
            <Box sx={{ mr: 2, mt: 1 }}>
              <Icon icon="paywall" />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">
                {user ? user.email : 'Sign in please'}
              </Typography>
            </Box>
          </>
        )}
      </DialogTitle>

      {!user ? (
        <>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Signin />
            </Box>
          </DialogContent>
        </>
      ) : (
        <DialogContent />
      )}

      <DialogActions>
        {user && (
          <Button
            fullWidth
            variant="contained"
            onClick={handleClose}
            endIcon={<Icon icon="tick" />}
          >
            OK
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
      </DialogActions>
    </Dialog>
  );
}
