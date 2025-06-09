'use client';
// core/gl-core/cartridges/Fallmanager/Fallmanager.tsx
import * as React from 'react';
import config from './config.json';
import { TFallmanager } from './types';
// import { Box, Button, Typography } from '@mui/material';
import { Theme } from '../../../gl-core';
import { Layout } from '../Fallmanager';

export default function Fallmanager({ payload = null }: TFallmanager) {
  return (
    <Theme theme={config.theme as any}>
      <Layout>
        <>A bunch of chillen</>
      </Layout>
    </Theme>
  );
}
