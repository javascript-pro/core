'use client';

import * as React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { Icon } from '../../';

export default function SpeakWrite() {
  return (
    <>
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <CardHeader
          avatar={<Icon icon="speak-write" />}
          title="SpeakWrite"
          subheader="Foreseen by Orwell in 1984, built for reals just now. By us"
        />

        <CardContent>Open Source AI propaganda generator</CardContent>
      </Card>
    </>
  );
}
