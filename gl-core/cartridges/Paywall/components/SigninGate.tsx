// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/SigninGate.tsx
'use client';
import * as React from 'react';
import { Box, Alert, AlertTitle } from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { useUser, setPaywallKey, usePaywall, Continue } from '../../Paywall';

export default function SigninGate() {
  const dispatch = useDispatch();
  const user = useUser();
  const paywall = usePaywall();
  // console.log("paywall", paywall)
  React.useEffect(() => {
    if (user) {
      dispatch(setPaywallKey('dialogOpen', false));
    }
  }, [user, dispatch]);

  return (
    <Box sx={{ mt: 3 }}>
      {!user ? (
        <>
          <Continue />
        </>
      ) : null}

      {/* Debug info (optional, remove in production) */}
      {/* <pre style={{ fontSize: '10px' }}>
        user: {JSON.stringify(user, null, 2)}
      </pre> */}
    </Box>
  );
}
