// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/components/Visitor.tsx
'use client';

import * as React from 'react';
import {
  Box,
  CardHeader,
  CircularProgress,
  Avatar,
  Typography,
  Alert,
  Menu,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch, Icon, routeTo } from '../../../../gl-core';
import {
  useVisitor,
  initFingerprint,
  ping,
  setUid,
  useUid,
} from '../../Bouncer';
import { firebaseAuth } from '../../Bouncer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Visitor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const visitor = useVisitor();
  const uid = useUid();

  const [loading, setLoading] = React.useState(true);
  const [userDoc, setUserDoc] = React.useState<any | null>(null);
  const [userDocNotFound, setUserDocNotFound] = React.useState(false);

  // fingerprint init
  const hasInitAttempted = React.useRef(false);
  React.useEffect(() => {
    if (
      !hasInitAttempted.current &&
      visitor &&
      typeof visitor === 'object' &&
      visitor.fingerprint === undefined &&
      !visitor.inittingFingerprint
    ) {
      hasInitAttempted.current = true;
      dispatch(initFingerprint());
    }
  }, [visitor, dispatch]);

  // ping every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(ping());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // auth state
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

  // firestore user doc
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

  // countdown for ping spinner
  const ICON_SIZE = 40;
  const [secondsLeft, setSecondsLeft] = React.useState(10);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          dispatch(ping());
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      <Box
        onClick={() => {}}
        sx={{ cursor: uid ? 'pointer' : 'default' }}
      >
        <CardHeader
          title={
            <Typography variant="body2">
                {userDoc?.displayName || 'Unnamed User'}
              </Typography>
          }
          subheader={<Typography variant="caption">{userDoc?.email || ''}</Typography>}
          avatar={
            <Box
              sx={{
                position: 'relative',
                width: ICON_SIZE,
                height: ICON_SIZE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Spinner ring always visible */}
              <CircularProgress
                size={ICON_SIZE + 8}
                thickness={4}
                variant="determinate"
                value={(secondsLeft / 10) * 100}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}
              />
              {/* Avatar or fallback */}
              {userDoc?.avatar ? (
                <Avatar
                  src={userDoc.avatar}
                  sx={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    zIndex: 2,
                    bgcolor: 'transparent',
                  }}
                />
              ) : (
                <Icon icon="visitor" />
              )}
              {/* Countdown number */}
              <Typography
                variant="caption"
                component="span"
                sx={{
                  position: 'absolute',
                  fontSize: 12,
                  fontWeight: 600,
                  zIndex: 3,
                }}
              >
                {secondsLeft}
              </Typography>
            </Box>
          }
        />
      </Box>

      {uid && userDocNotFound && (
        <Alert severity="warning" sx={{ mt: 1 }}>
          Warning: No user document found in Firestore for this UID.
        </Alert>
      )}

      
    </>
  );
}
