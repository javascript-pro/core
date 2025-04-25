'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { LightDarkToggle, NavButton } from '../../';
// import { BouncerBtn } from '../../cartridges/Bouncer';

export interface IHeaderNav {
  anyKey?: any;
}

export default function HeaderNav() {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <LightDarkToggle />

      <NavButton mode="icon" icon="home" title="Home" onClick={goHome} />
      {/* <BouncerBtn tooltip="Bollix" /> */}
    </Box>
  );
}
