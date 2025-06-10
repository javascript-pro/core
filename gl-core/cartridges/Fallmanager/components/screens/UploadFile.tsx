'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/UploadFile.tsx
import * as React from 'react';
import { Box } from '@mui/material';

export type TUploadFile = {
  payload?: any;
};

export default function UploadFile({ payload = null }: TUploadFile) {
  console.log('UploadFile', payload);

  return <Box sx={{ p: 1, border: '1px solid green' }}>Upload File Screen</Box>;
}
