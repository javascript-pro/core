'use client';
// core/gl-core/cartridges/Bouncer/components/Feedback.tsx

import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { TAuthForm } from '../../../gl-core/types';
import { useFeedback, useDispatch } from '../../../gl-core';


export default function Feedback({}: TAuthForm) {
  const feedback = useFeedback();
  const dispatch = useDispatch();

  console.log("FEEDBACK", feedback)
  

  React.useEffect(() => {
    if (feedback && !feedback.hidden) {
      const timer = setTimeout(() => {
        // dispatch(updateFeedback(null));
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [feedback, dispatch]);

  if (!feedback) return null

  const {title, description, severity} = feedback;

  return (
    <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert
        severity={severity}
        sx={{
          minWidth: 280,
        }}
      >
        <strong>{title}</strong>
        <br />
        {description}
      </Alert>
    </Snackbar>
  );
}
