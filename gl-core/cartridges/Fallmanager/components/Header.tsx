// core/gl-core/cartridges/Fallmanager/components/Header.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AppBar, CardHeader, ButtonBase } from '@mui/material';
import { useDispatch } from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';
import {SelectLanguage} from '../../Fallmanager'

export default function StickyHeader() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    window.open('/fallmanager', '_self');
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        boxShadow: 0,
        background: 'white',
        pb: 1,
      }}
    >
      <CardHeader
        avatar={
          <ButtonBase onClick={handleLogoClick} sx={{ p: 0 }}>
            <Image
              priority
              src="/_clients_/fallmanager/jpg/logo.jpg"
              alt="Fallmanager Logo"
              width={236}
              height={60}
              style={{ borderRadius: '4px' }}
            />
          </ButtonBase>
        }
        action={<><SelectLanguage/></>}
      />
    </AppBar>
  );
}
