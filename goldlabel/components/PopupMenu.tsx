'use client';
import config from '../config.json';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogTitle,
  CardHeader,
  Avatar,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import { Icon, ContextNav } from '../';
import { useKey } from '../cartridges/Uberedux';

type PopupMenuProps = {
  open?: boolean;
  onClose?: () => void;
  featured?: any;
  globalNav?: any;
};

export default function PopupMenu({
  open,
  onClose = () => {
    console.warn('Close');
  },
  featured,
}: PopupMenuProps) {
  const [darkmode] = useKey('darkmode');
  const theme = useTheme();
  const router = useRouter();
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


      <DialogContent sx={{mt: 3}}>
        <ContextNav onClose={onClose} featured={featured} />
      </DialogContent>

      <DialogActions sx={{ p: 1 }}>
        <IconButton
          sx={
            {
              // ml: -2,
            }
          }
          onClick={() => {
            onClose();
          }}
        >
          <Icon icon="close" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
