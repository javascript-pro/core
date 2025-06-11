// core/gl-core/cartridges/Fallmanager/components/StickyHeader.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, CardHeader, IconButton } from '@mui/material';
import { MightyButton, useDispatch } from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';
import { UserInfo } from '../../Fallmanager';

export default function StickyHeader() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    router.push('/fallmanager');
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  return (
    <Box>
      <CardHeader
        avatar={
          <IconButton onClick={handleLogoClick} sx={{ p: 0 }}>
            <Image
              priority
              src="/_clients_/fallmanager/jpg/logo.jpg"
              alt="Fallmanager Logo"
              width={236}
              height={60}
              style={{ borderRadius: '4px' }}
            />
          </IconButton>
        }
        action={
          <>
            <UserInfo />
          </>
        }
      />
    </Box>
  );
}
