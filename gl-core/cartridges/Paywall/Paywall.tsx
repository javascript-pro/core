// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/Paywall.tsx
'use client';
import * as React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PaywallChip, Signin } from './';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { setAuth } from './';
import { useDispatch } from '../../cartridges/Uberedux';

export default function Paywall() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const authed = !!user;
      dispatch(setAuth(authed, user));
      if (authed) setOpen(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Box>
      <PaywallChip />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3, p: 2 },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Paywall
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Signin />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
