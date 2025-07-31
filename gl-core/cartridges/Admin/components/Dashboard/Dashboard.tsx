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
// import {
//   // useAdminSlice,
//   MenuList,
// } from '../../../Admin';

export default function Dashboard() {
  // const slice = useAdminSlice();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Live Visitors" />
            <CardContent>
              Connect to Firebase and subscribe to the collection
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="button"
            sx={{
              mb: 3,
            }}
          >
            Dashboard
          </Typography>
          <MenuList />
        </Grid> */}
      </Grid>

      {/* <pre style={{ fontSize: 10 }}>
        slice: {JSON.stringify(slice, null, 2)}
      </pre> */}
    </Box>
  );
}
