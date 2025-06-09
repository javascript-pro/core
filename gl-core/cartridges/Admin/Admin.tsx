'use client';
// core/gl-core/cartridges/Admin/Admin.tsx
import * as React from 'react';
import config from './config.json';
import { TAdmin } from './types';
// import { Box, Button, Typography } from '@mui/material';
import { Theme } from '../../../gl-core';
import { Layout, StickyHeader } from '../Admin';

export default function Admin({ payload = null }: TAdmin) {
  return (
    <Theme theme={config.theme as any}>
      <Layout>
        <StickyHeader />
        <>A bunch of chillen</>
      </Layout>
    </Theme>
  );
}
