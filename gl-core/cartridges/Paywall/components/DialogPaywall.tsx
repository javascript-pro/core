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
import {
  usePaywall,
  useUser,
  setPaywallKey,
  Signin,
  User,
} from '../../Paywall';

export default function DialogPaywall() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
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
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 0,
        }}
      >
        <Box sx={{ mr: 2, mt: 1 }}>
          <Icon icon="paywall" />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            {user ? user.email : 'Sign in please'}
          </Typography>
        </Box>

        <IconButton
          aria-label="Close paywall"
          onClick={handleClose}
          color="primary"
        >
          <Icon icon="close" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {!user ? (
            <>
              <Signin />
            </>
          ) : (
            <>
              <User />
              {/* <pre>user: {JSON.stringify(user, null, 2)}</pre> */}
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        {user && (
          <Button onClick={handleSignout} endIcon={<Icon icon="signout" />}>
            Sign Out
          </Button>
        )}
        {/* <Box sx={{ flexGrow: 1 }} /> */}
      </DialogActions>
    </Dialog>
  );
}
