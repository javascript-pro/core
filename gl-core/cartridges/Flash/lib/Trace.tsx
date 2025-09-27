// /Users/goldlabel/GitHub/flash/app/src/Flash/components/Trace.tsx
import React from 'react';
import { Box } from '@mui/material';
import { TTrace } from '../types';
import { 
  IconButton,
} from '@mui/material';
import { Icon, useRedux } from '../../Flash';

export default function Trace({ children }: TTrace) {

  const s = useRedux();
  const show = false;
  return (
    <Box id="trace">
      <IconButton>
        <Icon icon="fingerprint" color="primary" />
      </IconButton>
      {children}
      {show ? <pre>s: {JSON.stringify(s, null, 2)}</pre> : null}
    </Box>
  );
}
