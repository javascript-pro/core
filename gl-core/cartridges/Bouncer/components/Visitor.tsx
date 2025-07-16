// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/Visitor.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Menu,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { useDispatch, MightyButton } from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { SignIn } from '../../Bouncer';

export default function Visitor() {
  const dispatch = useDispatch();

  // Track current Firebase user and loading state
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleSigninClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      setDialogOpen(true);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDialogOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      {currentUser ? (
        <>Hello</>
        // <MightyButton
        //   mode={isMobile ? 'icon' : 'button'}
        //   label="Sign out"
        //   variant="contained"
        //   color="primary"
        //   icon="signout"
        //   onClick={handleSignout}
        // />
      ) : (
        <>
          <MightyButton
            label="Sign in"
            variant="outlined"
            color="primary"
            icon="signin"
            iconPlacement="right"
            onClick={handleSigninClick as any}
          />

          {/* Desktop popup menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <SignIn onClose={handleClose} />
          </Menu>

          {/* Mobile fullscreen dialog */}
          <Dialog fullScreen open={dialogOpen} onClose={handleClose}>
            <DialogContent>
              <SignIn onClose={handleClose} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
}
