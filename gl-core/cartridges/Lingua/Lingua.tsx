// core/gl-core/cartridges/Lingua/Lingua.tsx
'use client';
import * as React from 'react';
import { TLingua } from './types';
import { Box } from '@mui/material';

export default function Lingua({ payload = null }: TLingua) {
  return (
    <>
      <Box sx={{ p: 1, border: '1px solid red' }}>Lingua</Box>
    </>
  );
}
