// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/SigninGate.tsx
'use client';
import * as React from 'react';
import { Box, Alert, AlertTitle } from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { useUser, setPaywallKey, Register, Signin } from '../../Paywall';

export default function SigninGate() {
  const dispatch = useDispatch();
  const user = useUser();

  React.useEffect(() => {
    if (user) {
      dispatch(setPaywallKey('dialogOpen', false));
    }
  }, [user, dispatch]);

  return (
    <Box sx={{ mt: 3 }}>
      {!user ? (
        <>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Signin />
          </Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>You must be signed in to view this content.</AlertTitle>
          </Alert>
        </>
      ) : (
        <Alert severity="success">
          <AlertTitle>Signed in as {user.email}</AlertTitle>
          UID: <code>{user.uid}</code>
        </Alert>
      )}

      {/* Debug info (optional, remove in production) */}
      {/* <pre style={{ fontSize: '10px' }}>
        user: {JSON.stringify(user, null, 2)}
      </pre> */}
    </Box>
  );
}
