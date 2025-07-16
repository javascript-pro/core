// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/User.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Avatar,
  Menu,
  Dialog,
  DialogContent,
  CircularProgress,
  Card,
  CardHeader,
  Typography,
  Alert,
  ButtonBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch, MightyButton, useIsMobile, Icon } from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SignIn, setUid, useUid } from '../../Bouncer';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function User() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const uid = useUid();

  const [userDoc, setUserDoc] = React.useState<any | null>(null);
  const [userDocNotFound, setUserDocNotFound] = React.useState(false);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUid(user.uid));
      } else {
        dispatch(setUid(null));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Subscribe to Firestore doc when uid is present
  React.useEffect(() => {
    if (!uid) {
      setUserDoc(null);
      setUserDocNotFound(false);
      return;
    }
    const ref = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setUserDoc(snap.data());
        setUserDocNotFound(false);
      } else {
        setUserDoc(null);
        setUserDocNotFound(true);
      }
    });
    return () => unsubscribe();
  }, [uid]);

  const isMobile = useIsMobile();
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
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setDialogOpen(false);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // If logged in (uid present), show user card as clickable ButtonBase
  if (uid) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Box>
          {userDocNotFound && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Warning: No user document found in Firestore for this UID.
            </Alert>
          )}

          {userDoc && (
            <>
              <ButtonBase
                onClick={handleCardClick}
                sx={{
                  textAlign: 'left',
                  overflow: 'hidden',
                  display: 'block',
                }}
              >
                <Box
                  sx={{
                    minWidth: 280,
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <CardHeader
                    title={userDoc.name || 'Unnamed User'}
                    subheader={userDoc.email || ''}
                    avatar={<Avatar src={userDoc.avatar} />}
                  />
                </Box>
              </ButtonBase>

              {/* Menu triggered by clicking the card */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <ListItemButton onClick={handleSignout} sx={{width: 200}}>
                  <ListItemIcon>
                    <Icon icon="signout" />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" />
                </ListItemButton>
              </Menu>
            </>
          )}
        </Box>
      </Box>
    );
  }

  // Otherwise show login button and dialog/menu
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      <MightyButton
        label="Sign in"
        variant="outlined"
        color="primary"
        icon="signin"
        iconPlacement="right"
        onClick={handleSigninClick as any}
      />

      {/* Desktop popup menu for Sign In */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && !uid}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SignIn onClose={handleCloseMenu} />
      </Menu>

      {/* Mobile fullscreen dialog */}
      <Dialog fullScreen open={dialogOpen} onClose={handleCloseMenu}>
        <DialogContent>
          <SignIn onClose={handleCloseMenu} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
