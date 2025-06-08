'use client';
// core/gl-core/cartridges/Bouncer/components/Feedback.tsx

import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { TAuthForm } from '../../Bouncer';
import { useFeedback } from '../../Bouncer';

export default function Feedback({}: TAuthForm) {
  const feedback = useFeedback();
  if (!feedback) return null
  return (
    <Snackbar
      open={!feedback.hidden}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={feedback.severity}
        sx={{ width: '100%' }}
        variant="filled"
      >
        <strong>{feedback.title}</strong>
        <br />
        {feedback.description}
      </Alert>
    </Snackbar>
  );
}
