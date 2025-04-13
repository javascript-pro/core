'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon, ContextNav } from '../';

type PopupMenuProps = {
  open?: boolean;
  onClose?: () => void;
  globalNav: any
};

export default function PopupMenu({ open, onClose, globalNav }: PopupMenuProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Dialog
      open={open as boolean}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          m: fullScreen ? 0 : 2,
          borderRadius: fullScreen ? 0 : 2,
        },
      }}
    >

      <DialogContent sx={{
        mb: 2
      }}>
        <ContextNav onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <ListItemButton onClick={onClose}>
          <ListItemIcon>
            <Icon icon="close" />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItemButton>
      </DialogActions>
    </Dialog>
  );
}
