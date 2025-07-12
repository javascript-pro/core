'use client';
// core/gl-core/components/includes/Feedback.tsx

import * as React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { TAuthForm } from '../../../gl-core/types';
import {
  useFeedback,
  useDispatch,
  toggleFeedback,
  Icon,
} from '../../../gl-core';

export default function Feedback({}: TAuthForm) {
  const feedback = useFeedback();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (feedback && !feedback.hidden) {
      const timer = setTimeout(() => {
        // console.log('toggleFeedback(null)');
        dispatch(toggleFeedback(null));
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [feedback, dispatch]);

  if (!feedback || feedback.hidden) return null;

  const { title, description, severity } = feedback;

  const handleClose = () => {
    dispatch(toggleFeedback(null));
  };

  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        variant='filled'
        severity={severity}
        sx={{ minWidth: 250 }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <Icon icon="close" />
          </IconButton>
        }
      >
        <strong>{title}</strong>
        <br />
        {description}
      </Alert>
    </Snackbar>
  );
}
