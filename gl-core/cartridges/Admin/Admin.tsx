// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/Admin.tsx
'use client';

import * as React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { Theme, useDispatch, useSlice } from '../../../gl-core';
import { useAdminSlice } from '../Admin';

export default function Admin() {
  const dispatch = useDispatch();
  const adminSlice = useAdminSlice();

  const theme = {
    mode: 'light',
    primary: '#305DA5',
    secondary: '#414142',
    background: '#eee',
    paper: '#FFFFFF',
    text: '#414142',
    border: '#414142',
  };

  return (
    <Theme theme={theme as any}>
      <CssBaseline />
      <Container>
        <pre>adminSlice: {JSON.stringify(adminSlice, null, 2)}</pre>
      </Container>
    </Theme>
  );
}
