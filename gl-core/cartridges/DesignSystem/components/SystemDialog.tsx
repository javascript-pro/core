// core/gl-core/cartridges/DesignSystem/components/SystemDialog.tsx
'use client';
import * as React from 'react';
import {
  CardHeader,
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
  const ds = useDesignSystem();

  const handleOpen = () => {
    dispatch(setDesignSystemKey('dialog', {
      open: true, 
      title: 'fuck',
    }));
  };
  
  const handleClose = () => {
    // dispatch(setDesignSystemKey('dialog', {open: true, title: 'fuck'}));
    dispatch(setDesignSystemKey('dialog', null));
  };

  if (!ds.dialog) return null;

  // console.log('SystemDialog ds.dialog', ds.dialog);

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
            avatar={<Icon icon={ds.dialog.icon as any} />}
            title={ds.dialog.title}
            subheader={ds.dialog.subheader}
          />
        </DialogTitle>

        <DialogContent>
          {/* {fakeData.content} */}

          <pre>dialog: {JSON.stringify(ds.dialog, null, 2)}</pre>
        </DialogContent>

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
