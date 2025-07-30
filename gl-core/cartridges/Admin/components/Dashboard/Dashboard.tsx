// core/gl-core/cartridges/Admin/components/Dashboard/Dashboard.tsx

'use client';

import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useAdminSlice, MenuList } from '../../../Admin';

export default function Dashboard() {
  const slice = useAdminSlice();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
            }}
          >
            Dashboard
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <MenuList />
        </Grid>
      </Grid>

      <pre style={{ fontSize: 10 }}>
        slice: {JSON.stringify(slice, null, 2)}
      </pre>
    </Box>
  );
}
