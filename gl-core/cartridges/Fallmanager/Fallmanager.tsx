// core/gl-core/cartridges/Fallmanager/Fallmanager.tsx
'use client';
import * as React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { Theme } from '../../../gl-core';
import { NewCase, useFallmanagerSlice, Header, Faelle, useLingua } from '../Fallmanager';

export default function Fallmanager() {
  const fallmanagerSlice = useFallmanagerSlice();
  
  const { theme } = fallmanagerSlice;

  return (
    <Theme theme={theme}>
      <CssBaseline />
      <Container>
        <NewCase />
        <Header />
        <Faelle />
      </Container>
    </Theme>
  );
}

/*
  <pre>fallmanagerSlice: {JSON.stringify(fallmanagerSlice, null, 2)}</pre>
*/
