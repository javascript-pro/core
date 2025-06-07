'use client';
// core/gl-core/cartridges/Bouncer/components/Feedback.tsx
import * as React from 'react';
import { DialogTitle, Typography } from '@mui/material';
import { TAuthForm } from '../../Bouncer';
// useBouncer
export default function Feedback({}: TAuthForm) {
  // const bouncerSlice = useBouncer();

  return (
    <>
      <DialogTitle>
        <Typography
          sx={{
            mt: 2,
          }}
        >
          Feedback
        </Typography>
      </DialogTitle>
    </>
  );
}
