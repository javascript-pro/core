'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
} from '@mui/material';
import { Icon, Sitemap } from '#/goldlabel';

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
      <DialogTitle sx={{ border: 0 }}>
        <Typography>&nbsp;</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 16, top: 8 }}
        >
          <Icon icon="close" />
        </IconButton>
      </DialogTitle>
      <DialogContent >
        <Sitemap 
          globalNav={globalNav} 
          onClose={onClose} 
          openTopLevelByDefault={1}
        />
      </DialogContent>
    </Dialog>
  );
}
