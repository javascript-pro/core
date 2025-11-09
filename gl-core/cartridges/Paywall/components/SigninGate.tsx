'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { setAuth, usePaywall } from '../';
import { useDispatch } from '../../Uberedux';

export default function SigninGate() {
  const paywall = usePaywall();

  return (
    <Box>
      <Typography>SigninGate</Typography>
      <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre>
    </Box>
  );
}
