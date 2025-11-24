// core/gl-core/cartridges/DesignSystem/components/SystemDialog.tsx
'use client';
import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  // DialogTitle,
} from '@mui/material';
import { useDispatch, useIsMobile, Icon } from '../../../../gl-core';
import {
  useDesignSystem,
  setDesignSystemKey,
  MenuSystem,
} from '../../DesignSystem';
// import { useUser, Continue, User } from '../../Paywall';

export default function SystemDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  // const user = useUser();
  const ds = useDesignSystem();
  const { fullScreen } = ds;

  const handleClose = () => {
    dispatch(setDesignSystemKey('dialog', null));
  };

  const toggleFullscreen = () => {
    dispatch(setDesignSystemKey('fullScreen', !fullScreen));
  };

  if (!ds.dialog) return null;

  return (
    <>
      <Dialog
        fullWidth
        fullScreen={isMobile || fullScreen}
        open={Boolean(ds.dialog)}
        onClose={handleClose}
        maxWidth={'sm'}
      >
        {/* <DialogTitle>{!user ? <Continue /> : <User />}</DialogTitle> */}
        <DialogContent />
        <DialogActions sx={{ display: 'block' }}>
          <MenuSystem />
        </DialogActions>
        <DialogActions>
          <IconButton color="primary" onClick={toggleFullscreen}>
            <Icon icon="fullscreen" />
          </IconButton>
          <IconButton color="primary" onClick={handleClose}>
            <Icon icon="close" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
