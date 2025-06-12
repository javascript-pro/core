'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Uploads.tsx
import * as React from 'react';
import { Typography, Box, CardHeader } from '@mui/material';
import { UploadList, UploadNew } from '../../../Fallmanager';

export default function Uploads() {
  return (
    <Box>
      <CardHeader 
        title={<Typography variant='h6'>Uploads</Typography>}
        avatar={<UploadNew />}
      />
      <UploadList />
    </Box>
  );
}
