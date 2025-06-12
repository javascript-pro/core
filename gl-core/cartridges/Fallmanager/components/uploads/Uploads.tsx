'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Uploads.tsx

import * as React from 'react';
import { Grid, Box } from '@mui/material';
import { UploadList, UploadNew } from '../../../Fallmanager';

export default function Uploads() {
  return (
    <Grid container spacing={2}>
      <Grid
        size={{
          xs: 12,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <UploadNew />
        </Box>
        <UploadList />
      </Grid>
    </Grid>
  );
}
