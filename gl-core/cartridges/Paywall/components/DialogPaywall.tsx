'use client';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CardHeader,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
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

  const handleClose = () => {
    dispatch(setPaywallKey('dialogOpen', false));
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
        <CardHeader
          action={
            <>
              <IconButton color="primary" onClick={handleClose}>
                <Icon icon="close" />
              </IconButton>
            </>
          }
        />
      </DialogTitle>
      <User />

      {!user ? (
        <>
          <DialogContent>
            {user ? <User /> : null}
            <Box sx={{}}>
              <SignInUp />
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
