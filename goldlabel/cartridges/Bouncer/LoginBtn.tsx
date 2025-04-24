'use client';
import * as React from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '../../';
import { BouncerModal } from '../../cartridges/Bouncer';
import { useKey } from '../../cartridges/Uberedux';

export interface ILoginBtn {
  anyKey?: any;
}

export default function LoginBtn({}) {
  const [authModalOpen, setAuthModalOpen] = useKey('authModalOpen');

  return (
    <>
      <BouncerModal />
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
