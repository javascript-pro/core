// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/Tings.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { useUser } from '../../Paywall';

export default function Tings() {
  const user = useUser();

  return (
    <Box>
      {/* <pre style={{ fontSize: '10px' }}>
      user: {JSON.stringify(user, null, 2)}
    </pre> */}

      {user && <>Tings</>}
    </Box>
  );
}
