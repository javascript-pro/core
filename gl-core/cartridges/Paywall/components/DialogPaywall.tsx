// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/DialogPaywall.tsx
'use client';
import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../../gl-core';
import { usePaywall, setPaywallKey } from '../../Paywall';

export default function DialogPaywall() {
  
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const pw = usePaywall();
  const { dialogOpen, user } = pw ?? {};

  const handleClose = () => {
    dispatch(setPaywallKey('dialogOpen', false ));
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
        <Typography>Paywall</Typography>

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
            <Typography variant="body2" color="text.secondary">
              Please sign in to continue.
            </Typography>
          ) : (
            <Typography variant="body2">
              Welcome back, {user.displayName || 'user'}.
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
