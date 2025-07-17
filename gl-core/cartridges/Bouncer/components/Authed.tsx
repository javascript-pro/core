'use client';
// core/gl-core/cartridges/Bouncer/components/Authed.tsx
import * as React from 'react';
import { Paper } from '@mui/material';
import { TAuthed } from '../../Bouncer/types';
import { SignoutButton, useUid } from '../../Bouncer';

export default function Authed({}: TAuthed) {
  const user = useUid();

  return (
    <Paper>
      <pre style={{ fontSize: 10 }}>user: {JSON.stringify(user, null, 2)}</pre>
      <SignoutButton />
    </Paper>
  );
}
