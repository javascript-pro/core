// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/Public.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Avatar,
  Menu,
  Dialog,
  DialogContent,
  CircularProgress,
  CardHeader,
  Alert,
  ButtonBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  useDispatch,
  MightyButton,
  useIsMobile,
  routeTo,
  Icon,
} from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  SignIn,
  setUid,
  useUid,
  useBouncer,
  useVisitor,
  ping,
  makeFingerprint,
} from '../../Bouncer';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Public() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const uid = useUid();
  const visitor = useVisitor();
  const slice = useBouncer();
  const router = useRouter();

  const [userDoc, setUserDoc] = React.useState<any | null>(null);
  const [userDocNotFound, setUserDocNotFound] = React.useState(false);

  // Run ping whenever slice changes
  React.useEffect(() => {
    dispatch(ping());
  }, [dispatch, slice]);

  // Dispatch ping every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(ping());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // If fingerprint is missing, dispatch makeFingerprint
  React.useEffect(() => {
    if (
      visitor &&
      typeof visitor === 'object' &&
      visitor.fingerprint === undefined
    ) {
      dispatch(makeFingerprint());
    }
  }, [visitor, dispatch]);

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

  React.useEffect(() => {
    if (!uid) {
      setUserDoc(null);
      setUserDocNotFound(false);
      return;
    }
    const ref = doc(db, 'auth', uid);
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

  const handleAdminClick = () => {
    dispatch(routeTo('/admin', router));
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

  if (uid) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                    width: 220,
                    textAlign: 'left',
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="body2">
                        {userDoc.displayName || 'Unnamed User'}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="caption">
                        {userDoc.email || ''}
                      </Typography>
                    }
                    action={
                      <Avatar
                        sx={{ width: 32, height: 32, mt: 1 }}
                        src={userDoc.avatar}
                      />
                    }
                  />
                </Box>
              </ButtonBase>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <ListItemButton onClick={handleAdminClick} sx={{ width: 225 }}>
                  <ListItemIcon>
                    <Icon icon="admin" />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItemButton>

                <ListItemButton onClick={handleSignout}>
                  <ListItemIcon>
                    <Icon icon="signout" />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" />
                </ListItemButton>
              </Menu>
            </>
          )}
        </Box>
        {/* <pre>visitor: {JSON.stringify(visitor, null, 2)}</pre> */}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      {/* <pre>visitor: {JSON.stringify(visitor, null, 2)}</pre> */}
      <MightyButton
        mode="icon"
        label="Sign in"
        variant="contained"
        color="primary"
        icon="signin"
        iconPlacement="right"
        onClick={handleSigninClick as any}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && !uid}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SignIn onClose={handleCloseMenu} />
      </Menu>

      <Dialog fullScreen open={dialogOpen} onClose={handleCloseMenu}>
        <DialogContent>
          <SignIn onClose={handleCloseMenu} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
