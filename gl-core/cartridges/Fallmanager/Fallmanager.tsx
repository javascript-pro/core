'use client';
// core/gl-core/cartridges/Fallmanager/Fallmanager.tsx
import * as React from 'react';
import config from './config.json';
import { TFallmanager } from './types';
import { Card, Button, Typography } from '@mui/material';
import { Theme } from '../../../gl-core';
import { UploadFile, useFallmanager } from '../Fallmanager';

export default function Fallmanager({ payload = null }: TFallmanager) {

  const slice = useFallmanager();
  return (
    <Theme theme={config.theme as any}>
      <Card>
        <>A bunch of chillen</>

        <pre style={{ fontSize: 10 }}>
          slice : {JSON.stringify(slice, null, 2)}
        </pre>
      </Card>
    </Theme>
  );
}
