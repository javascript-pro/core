'use client';

import * as React from 'react';
import { useSlice } from '../Uberedux';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Icon } from '../../';

export default function Uberedux() {
  const slice = useSlice();

  return (
    <Card>
      <CardHeader
        avatar={<Icon icon="uberedux" color="primary" />}
        title="Uberedux"
        subheader="State management gives Core structure and control"
      />
      <CardContent>
        <Typography>store was persisted</Typography>

        <pre>slice: {JSON.stringify(slice, null, 2)}</pre>
      </CardContent>

    </Card>
  );
}
