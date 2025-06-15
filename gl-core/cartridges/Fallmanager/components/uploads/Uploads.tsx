'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Uploads.tsx
import * as React from 'react';
import { Typography, Box, Card, CardHeader, CardContent } from '@mui/material';
import { UploadList, UploadNew } from '../../../Fallmanager';

export default function Uploads() {
  return (
    <Card>
      <CardHeader title="Uploads" subheader="X files" />
      <CardContent>List files uploaded</CardContent>
    </Card>
  );
}

/*
    <Box>
      <CardHeader
        title={<Typography variant="h6">Uploads</Typography>}
        avatar={<UploadNew />}
      />
      <UploadList />
    </Box>
*/
