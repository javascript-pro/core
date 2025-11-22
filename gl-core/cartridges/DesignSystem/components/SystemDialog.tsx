// core/gl-core/cartridges/DesignSystem/components/SystemDialog.tsx
'use client';
import * as React from 'react';
import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle,
  CardHeader,
  Typography,
} from '@mui/material';
import { useDispatch, useIsMobile, Icon } from '../../../../gl-core';
import {
  useDesignSystem,
  setDesignSystemKey,
  MenuSystem,
} from '../../DesignSystem';
import { useUser, Continue, User } from '../../Paywall';

export default function SystemDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();
  // const paywall = usePaywall();
  const user = useUser();

  const handleClose = () => {
    // dispatch(setDesignSystemKey('dialog', {open: true, title: 'fuck'}));
    dispatch(setDesignSystemKey('dialog', null));
  };

  if (!ds.dialog) return null;

  return (
    <>
      <Dialog
        fullScreen={isMobile}
        open={Boolean(ds.dialog)}
        onClose={handleClose}
        maxWidth={'md'}
        fullWidth
      >
        <DialogTitle>
          <CardHeader
            title={!user ? <Continue /> : <User />}
            subheader={ds.dialog.subheader}
            action={<Icon icon={'fullscreen'} />}
          />
        </DialogTitle>

        <DialogContent />

        <DialogActions sx={{ display: 'block' }}>
          <MenuSystem />
        </DialogActions>

        <DialogActions>
          <IconButton color="primary" onClick={handleClose}>
            <Icon icon="close" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
