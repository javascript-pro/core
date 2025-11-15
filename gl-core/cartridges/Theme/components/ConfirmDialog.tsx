// /Users/goldlabel/GitHub/core/gl-core/cartridges/Theme/components/ConfirmDialog.tsx
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { Icon, useIsMobile } from '../../../../gl-core';

type Props = {
  open: boolean;
  title: string;
  message: string | React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: string;
  danger?: boolean;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  icon,
  danger = false,
}: Props) {
  const isMobile = useIsMobile();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {typeof message === 'string' ? (
          <Typography>{message}</Typography>
        ) : (
          message
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{cancelLabel}</Button>

        <Button
          variant="contained"
          color={danger ? 'error' : 'primary'}
          endIcon={icon ? <Icon icon={icon as any} /> : undefined}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
