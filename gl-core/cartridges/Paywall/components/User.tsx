'use client';
import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useUser, userSignout, setPaywallKey, UserCard } from '../../Paywall';
import { Icon, useDispatch } from '../../../../gl-core';

export default function User() {
  const user = useUser();
  const dispatch = useDispatch();
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  if (!user) return null;

  // --- normalised fields ---
  const provider = user.providerData?.[0];
  const displayName = user.displayName || provider?.displayName || '';
  const email = user.email || provider?.email || '';
  const photoURL = user.photoURL || provider?.photoURL || '';
  const providerId = provider?.providerId || '';
  const uid = user.uid;

  const handleSignout = () => {
    dispatch(userSignout());
    dispatch(setPaywallKey('dialogOpen', false));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <UserCard />
      </Box>
      <List>
        <ListItemButton onClick={() => setConfirmOpen(true)}>
          <ListItemIcon>
            <Icon icon="signout" />
          </ListItemIcon>
          <ListItemText secondary="Sign Out" />
        </ListItemButton>
      </List>

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
            size="large"
            variant="contained"
            color="error"
            endIcon={<Icon icon="signout" />}
            onClick={handleSignout}
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
