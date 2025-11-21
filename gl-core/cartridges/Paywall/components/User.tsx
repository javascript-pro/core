// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { useUser, UserCard } from '../../Paywall';

export default function User() {

  const user = useUser();
  const uid = user?.uid ?? null;

  return (
    <Box sx={{ p: 0 }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
        }}
      >
        UID: {uid}

        {/* <pre>user: {JSON.stringify(user, null, 2)}</pre> */}

      </Box>
    </Box>
  );
}
