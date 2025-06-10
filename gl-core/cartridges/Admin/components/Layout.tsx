// core/gl-core/cartridges/Admin/components/Layout.tsx
'use client';
import * as React from 'react';
import { TLayout } from '../types';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Fab,
  styled,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Icon, useDispatch } from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Layout({ children = null }: TLayout) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Box sx={{ pb: '50px' }}>
        <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
          Admin Cartridge
        </Typography>
      </Box>

      <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton onClick={handleBack} color="inherit" aria-label="Go Back">
            <Icon icon="left" />
          </IconButton>
          <StyledFab color="secondary" aria-label="Add Case">
            <Icon icon="add" />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            aria-label="Signout"
            color="inherit"
            onClick={handleSignout}
          >
            <Icon icon="signout" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
