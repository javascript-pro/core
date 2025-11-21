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
  MenuGrid,
} from '../../DesignSystem';
// import {
//   usePaywall,
//   useUser,
// } from '../../Paywall';

export default function SystemDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();
  // const paywall = usePaywall();
  // const user = useUser();

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
            avatar={<Icon icon={'goldlabel'} />}
            title={<Typography variant="h6">Goldlabel Apps</Typography>}
            subheader={ds.dialog.subheader}
          />
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              m: 2,
            }}
          >
            <MenuGrid />
          </Box>
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
