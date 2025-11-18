// core/gl-core/cartridges/DesignSystem/components/SystemDialog.tsx
'use client';
import * as React from 'react';
import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../../gl-core';
import { useDesignSystem, setDesignSystemKey } from '../../DesignSystem';

export default function SystemDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const data = useDesignSystem();

  const handleClose = () => {
    // dispatch(setDesignSystemKey('dialog', {open: true, title: 'fuck'}));
    dispatch(setDesignSystemKey('dialog', null));
  };

  return (
    <>
      <Dialog
        open={Boolean(data)}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth={'md'}
        fullWidth
      >
        <DialogTitle>DialogTitle</DialogTitle>

        <DialogContent>Lorem Ipsum</DialogContent>

        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="primary" onClick={handleClose}>
            <Icon icon="close" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
