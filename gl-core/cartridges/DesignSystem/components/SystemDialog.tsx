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
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDispatch, Icon, useIsMobile, reset } from '../../../../gl-core';
import {
  useDesignSystem,
  setDesignSystemKey,
  MenuGrid,
} from '../../DesignSystem';

export default function SystemDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();

  const handleOpen = () => {
    dispatch(
      setDesignSystemKey('dialog', {
        open: true,
        title: 'fuck',
      }),
    );
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
        {/* <DialogTitle>
          <CardHeader
            avatar={<Icon icon={ds.dialog.icon as any} />}
            title={<Typography variant="h6">{ds.dialog.title}</Typography>}
            subheader={ds.dialog.subheader}
          />
        </DialogTitle> */}

        <DialogContent>
          <Box
            sx={{
              m: 2,
            }}
          >
            <MenuGrid />
          </Box>
          {/* <pre>dialog: {JSON.stringify(ds.dialog, null, 2)}</pre> */}
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
