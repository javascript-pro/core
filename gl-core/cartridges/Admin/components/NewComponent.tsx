'use client';
// core/gl-core/cartridges/Admin/components/NewComponent.tsx
import * as React from 'react';
import { Box } from '@mui/material';
import { TNewComponent } from '../types';

export default function NewComponent({ payload = null }: TNewComponent) {
  console.log('NewComponent', payload);
  return <Box sx={{ p: 1, border: '1px solid gold' }}>NewComponent</Box>;
}
