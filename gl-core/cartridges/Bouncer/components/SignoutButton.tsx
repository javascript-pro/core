'use client';
// core/gl-core/cartridges/Bouncer/components/SignoutButton.tsx

import * as React from 'react';
import { Fab, Box } from '@mui/material';
import { TSignoutButton } from '../../Bouncer/types';
import { useDispatch, Icon } from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';

export default function SignoutButton({}: TSignoutButton) {
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Fab color="primary" onClick={handleSignout} aria-label="sign out">
        <Icon icon="signout" />
      </Fab>
    </Box>
  );
}
