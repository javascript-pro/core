'use client';
import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Icon } from '../../';
import { AuthModal } from '../../cartridges/Auth';
import { useKey } from '../../cartridges/Uberedux';

export interface ISignupSignin {
  anyKey?: any;
}

export default function SignupSignin({}) {
  const [authModalOpen, setAuthModalOpen] = useKey('authModalOpen');

  return (
    <>
      <AuthModal />
      <IconButton
        onClick={() => {
          setAuthModalOpen(true);
        }}
      >
        <Icon icon="signin" />
      </IconButton>
    </>
  );
}
