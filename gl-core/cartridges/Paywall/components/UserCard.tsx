// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/UserCard.tsx 
'use client';
import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useUser, userSignout, setPaywallKey } from '../../Paywall';
import { Icon, useDispatch } from '../../../../gl-core';
import moment from 'moment';

export default function UserCard() {
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={photoURL}
          sx={{ width: 64, height: 64, mr: 2, borderRadius: 2 }}
        />
        <Box>
          <Typography variant="h6">{displayName}</Typography>
          <Typography variant="body2" color="text.primary">
            {email}
          </Typography>
          <ListItemText secondary={uid} />
          
        </Box>
      </Box>

      <List disablePadding>

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
