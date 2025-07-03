// core/gl-core/cartridges/Fallmanager/Fallmanager.tsx
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { CssBaseline, Container } from '@mui/material';
import { Theme } from '../../../gl-core';
import {
  NewCase,
  Header,
  Fallliste,
  Fall,
  useFallmanagerSlice,
} from '../Fallmanager';

export default function Fallmanager() {
  const { theme } = useFallmanagerSlice();
  const pathname = usePathname();

  const isListView = pathname === '/fallmanager';

  return (
    <Theme theme={theme}>
      <CssBaseline />
      <Container>
        <NewCase />
        <Header />
        {isListView ? <Fallliste /> : <Fall />}
      </Container>
    </Theme>
  );
}
