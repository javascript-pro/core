'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Uploads.tsx

import * as React from 'react';
import { Grid } from '@mui/material';
import { UploadList, UploadNew, UploadEdit } from '../../../Fallmanager';

export default function Uploads() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <UploadNew />
        <UploadList />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <UploadEdit />
      </Grid>
    </Grid>
  );
}
