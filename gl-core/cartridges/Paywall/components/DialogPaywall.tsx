'use client';
import * as React from 'react';
import {
  Dialog,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../../gl-core';
import {
  usePaywall,
  useUser,
  setPaywallKey,
  SignInUp,
  User,
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
    <Dialog
      open={Boolean(dialogOpen)}
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="xs"
      fullWidth
    >
        {/* <CardHeader
          action={
            <>
              <IconButton color="primary" onClick={handleClose}>
                <Icon icon="close" />
              </IconButton>
            </>
          }
        /> */}
      <User />

      {!user ? (
        <>
          {user ? <User /> : null}
          <SignInUp />
        </>
      ) : null}

        {user && (
          <Button
            sx={{m:1, mt: 3}}
            
            variant="contained"
            onClick={handleClose}
            endIcon={<Icon icon="tick" />}
          >
            OK
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
    </Dialog>
  );
}
