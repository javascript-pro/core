// core/gl-core/cartridges/Fallmanager/Fallmanager.tsx
'use client';

import * as React from 'react';
// import { Box, Container, AppBar, CssBaseline } from '@mui/material';
// import { Theme } from '../../../gl-core';

import {
  useFallmanagerSlice,
} from '../Fallmanager'

export default function Fallmanager() {
  const fallmanagerSlice = useFallmanagerSlice();
  return <>
    Fallmanager
    <pre>{JSON.stringify(fallmanagerSlice, null, 2)}</pre>
  </>
}
