'use client';
// core/gl-core/cartridges/Bouncer/components/Feedback.tsx

import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { TAuthForm } from '../../../gl-core/types';
import { useFeedback, useDispatch } from '../../../gl-core';

export default function Feedback({}: TAuthForm) {
  const feedback = useFeedback();
  const dispatch = useDispatch();
  const turnOffFeedback = false;

  React.useEffect(() => {
    if (feedback && !feedback.hidden) {
      const timer = setTimeout(() => {
        // dispatch(updateFeedback(null));
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [feedback, dispatch]);

  return (
    <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert 
        severity={"success"} 
        sx={{ 
          minWidth: 280,
        }}
      >
        <strong>{"feedback.title"}</strong>
        <br />
        {"feedback.description"}
      </Alert>
    </Snackbar>
  );
}
