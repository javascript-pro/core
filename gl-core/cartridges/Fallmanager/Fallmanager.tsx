'use client';
// core/gl-core/cartridges/Fallmanager/Fallmanager.tsx
import * as React from 'react';
import { TFallmanager } from './types';
// import { Box, Button, Typography } from '@mui/material';
// import { useDispatch, navigateTo, Icon } from '../../../gl-core';
import { Layout } from '../Fallmanager';

export default function Fallmanager({ payload = null }: TFallmanager) {
  // const dispatch = useDispatch();

  // const handleCartridgeHome = () => {
  //   console.log('Fallmanager payload', payload);
  //   dispatch(navigateTo('/cartridges/new-cartridge'));
  // };

  return (
    <>
      <Layout>
        <>A bunch of chillen</>
      </Layout>
    </>
  );
}
