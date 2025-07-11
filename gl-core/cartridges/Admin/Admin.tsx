'use client';

import * as React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { Theme, useDispatch } from '../../../gl-core';

export default function Admin() {
  const dispatch = useDispatch();
  return (
    <>
      <CssBaseline />
      <Container>
        Admin
      </Container>
    </>
  );
}
