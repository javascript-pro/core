// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/User.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { useUser, useIsUberUser, SignOut } from '../../Paywall';

export default function User() {
  const user = useUser();
  const uid = user?.uid ?? null;
  const isUberUser = useIsUberUser();

  return (
    <Box sx={{ p: 0 }}>
      UID: {uid}
      <pre>isUberUser: {JSON.stringify(isUberUser, null, 2)}</pre>
      <SignOut />
    </Box>
  );
}
