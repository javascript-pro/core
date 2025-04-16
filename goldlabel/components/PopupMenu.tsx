'use client';

import * as React from 'react';
// import { useKey } from '../../lib/useKey';
// import { useSlice } from '../../lib/useSlice';
import {
  Dialog,
  DialogTitle,
  CardHeader,
  Avatar,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon, ContextNav } from '../';

type PopupMenuProps = {
  open?: boolean;
  onClose?: () => void;
  globalNav: any;
};

export default function PopupMenu({
  open,
  onClose,
  globalNav,
}: PopupMenuProps) {
  const theme = useTheme();

  // const slice = useSlice();
  // const [darkmode, setDarkmode] = useKey('darkmode');
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
      <DialogTitle>
        <CardHeader
          avatar={<Avatar src={'/svg/favicon_nobg.svg'} />}
          title="Goldlabel Menu"
        />
      </DialogTitle>
      <DialogContent>
        <ContextNav onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <ListItemButton onClick={onClose}>
          <ListItemIcon>
            <Icon icon="close" color="primary" />
          </ListItemIcon>
        </ListItemButton>
      </DialogActions>
    </Dialog>
  );
}
