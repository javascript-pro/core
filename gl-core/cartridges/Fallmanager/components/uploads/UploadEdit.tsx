// core/gl-core/cartridges/Fallmanager/components/screens/UploadNew.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { MightyButton, useDispatch } from '../../../../../gl-core';

export default function UploadEdit() {
  const router = useRouter();
  const dispatch = useDispatch();

  return <Box sx={{ border: '3px solid limegreen' }}>UploadEdit</Box>;
}
