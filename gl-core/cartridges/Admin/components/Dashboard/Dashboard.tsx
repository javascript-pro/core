// core/gl-core/cartridges/Admin/components/Dashboard/Dashboard.tsx

'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import {
  BouncerAdmin,
} from '../../../Bouncer';

export default function Dashboard() {
  // const slice = useAdminSlice();
  return (
    <Box>
      <Grid container spacing={2}>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <BouncerAdmin />
        </Grid>
      </Grid>

      {/* <pre style={{ fontSize: 10 }}>
        slice: {JSON.stringify(slice, null, 2)}
      </pre> */}
    </Box>
  );
}
