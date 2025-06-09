'use client';
// core/gl-core/cartridges/Admin/components/StickyHeader.tsx
import * as React from 'react';
import { Box } from '@mui/material';
import { TNewComponent } from '../types';

export default function StickyHeader({ payload = null }: TNewComponent) {
  console.log('StickyHeader', payload);

  return <Box sx={{ p: 1, border: '1px solid gold' }}>StickyHeader</Box>;
}
