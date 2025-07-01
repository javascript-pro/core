// core/gl-core/cartridges/Fallmanager/components/Header.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  AppBar,
  CardHeader,
  ButtonBase,
  IconButton,
  Box,
} from '@mui/material';
import { useDispatch, resetUberedux, Icon } from '../../../../gl-core';
import { Sprachauswahl } from '../../Fallmanager';

export default function StickyHeader() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    window.open('/fallmanager', '_self');
  };

  const handleReset = () => {
    dispatch(resetUberedux());
    window.open('/fallmanager', '_self');
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
        action={
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Sprachauswahl />
            <IconButton onClick={handleReset} size="small" sx={{ mt: 1 }}>
              <Icon icon="reset" />
            </IconButton>
          </Box>
        }
      />
    </AppBar>
  );
}
