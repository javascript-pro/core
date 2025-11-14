'use client';
import * as React from 'react';
import { Dialog, Box, Button, DialogActions, DialogTitle, DialogContent, Typography } from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../../gl-core';
import {
  usePaywall,
  useUser,
  setPaywallKey,
  SignInUp,
  User,
  userSignout,
} from '../../Paywall';

export default function DialogPaywall() {
  const dispatch = useDispatch();
  const pw = usePaywall();
  const { dialogOpen } = pw ?? {};
  const user = useUser();
  const isMobile = useIsMobile();

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleClose = () => {
    dispatch(setPaywallKey('dialogOpen', false));
  };

  const handleSignout = () => {
    dispatch(userSignout());
    dispatch(setPaywallKey('dialogOpen', false));
  };

  return (
    <>
      {/* MAIN DIALOG */}
      <Dialog
        open={Boolean(dialogOpen)}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth={user ? "lg" : "sm"}
        fullWidth
      >
        <User />

        {!user ? (
          <>
            {user ? <User /> : null}
            <SignInUp />
          </>
        ) : null}

        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />

          {user && (
            <>
              <Button
                sx={{ m: 1, mt: 3 }}
                variant="outlined"
                onClick={() => setConfirmOpen(true)}
                endIcon={<Icon icon="signout" />}
              >
                Sign Out
              </Button>

              <Button
                sx={{ m: 1, mt: 3 }}
                variant="contained"
                onClick={handleClose}
                endIcon={<Icon icon="tick" />}
              >
                Close
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* CONFIRM SIGNOUT DIALOG */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to sign out?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            color="error"
            endIcon={<Icon icon="signout" />}
            onClick={handleSignout}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
