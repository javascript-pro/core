'use client';
import * as React from 'react';
import {
  Dialog,
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../../gl-core';
import {
  usePaywall,
  useUser,
  setPaywallKey,
  SignInUp,
  User,
  SignOut,
} from '../../Paywall';

export default function DialogPaywall() {
  const dispatch = useDispatch();
  const pw = usePaywall();
  const { dialogOpen } = pw ?? {};
  const user = useUser();
  const isMobile = useIsMobile();

  const handleClose = () => {
    dispatch(setPaywallKey('dialogOpen', false));
  };

  return (
    <>
      {/* MAIN DIALOG */}
      <Dialog
        open={Boolean(dialogOpen)}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth={user ? 'xs' : 'xs'}
        fullWidth
      >
        <User />
        {!user ? (
          <>
            {user ? <User /> : null}
            <SignInUp />
          </>
        ) : null}

        <DialogContent />

        <DialogActions>
          {user && (
            <>
              <SignOut />
              <Box sx={{ flexGrow: 1 }} />
              <IconButton color="primary" onClick={handleClose}>
                <Icon icon="close" />
              </IconButton>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
