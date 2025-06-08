'use client';
// core/gl-core/cartridges/Bouncer/components/Feedback.tsx

import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { TAuthForm } from '../../Bouncer';
import { useFeedback, updateFeedback } from '../../Bouncer';
import { useDispatch } from '../../../../gl-core';

export default function Feedback({}: TAuthForm) {
  const feedback = useFeedback();
  const dispatch = useDispatch();
  const turnOffFeedback = true;

  React.useEffect(() => {
    if (feedback && !feedback.hidden) {
      const timer = setTimeout(() => {
        dispatch(updateFeedback(null));
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [feedback, dispatch]);

  if (turnOffFeedback || !feedback || feedback.hidden || !feedback.title)
    return null;

  return (
    <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <Alert severity={feedback.severity} sx={{ width: '100%' }}>
        <strong>{feedback.title}</strong>
        <br />
        {feedback.description}
      </Alert>
    </Snackbar>
  );
}
