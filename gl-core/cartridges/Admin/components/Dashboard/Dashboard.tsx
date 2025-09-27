// core/gl-core/cartridges/Admin/components/Dashboard/Dashboard.tsx
'use client';
import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { LogsAdmin } from '../../../Admin';

export default function Dashboard() {
  // const slice = useAdminSlice();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LogsAdmin />
        </Grid>
      </Grid>
    </Box>
  );
}
