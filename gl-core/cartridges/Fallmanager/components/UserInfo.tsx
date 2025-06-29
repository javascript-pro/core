'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch, routeTo, resetUberedux } from '../../../../gl-core';
import { Icon } from '../../Fallmanager';
import { useUser, firebaseAuth } from '../../Bouncer';
import { db } from '../../../../gl-core/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function UserInfo() {
  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const { uid } = user;

  const [userDoc, setUserDoc] = React.useState<Record<string, any> | null>(
    null,
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (!uid) return;

    const userRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserDoc(docSnap.data());
      } else {
        setUserDoc(null);
      }
    });

    return () => unsubscribe();
  }, [uid]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFactorySettings = () => {
    dispatch(resetUberedux());
    setTimeout(() => {
      window.location.reload();
    }, 250);
  };

  const handleHome = () => {
    dispatch(routeTo('/', router));
    handleClose();
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: 1,
        }}
        onClick={handleClick}
      >
        <Typography variant="h6">{userDoc?.name}</Typography>
        <Avatar src={userDoc?.avatar} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: 185 }} />

        <MenuItem onClick={handleHome} sx={{ mt: 1 }}>
          <ListItemIcon>
            <Icon icon="home" />
          </ListItemIcon>
          <ListItemText primary="Goldlabel Home" />
        </MenuItem>
        <MenuItem
          sx={{ my: 2 }}
          onClick={(e) => {
            handleFactorySettings();
          }}
        >
          <ListItemIcon>
            <Icon icon="reset" />
          </ListItemIcon>
          <ListItemText primary="Reset" />
        </MenuItem>

        <MenuItem onClick={handleSignout}>
          <ListItemIcon>
            <Icon icon="signout" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>

        {/* You can add more MenuItem components here */}
      </Menu>
    </>
  );
}
