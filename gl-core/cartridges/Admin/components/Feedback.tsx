'use client';

import * as React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { useFeedback, useDispatch, Icon } from '../../../../gl-core';
import { showFeedback } from '../../Admin';

export default function Feedback({}: any) {
  const feedback = useFeedback();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (feedback && !feedback.hidden) {
      const timer = setTimeout(() => {
        dispatch(showFeedback(null));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [feedback, dispatch]);

  if (!feedback || feedback.hidden) return null;

  const { title, description, severity } = feedback;

  const handleClose = () => {
    dispatch(showFeedback(null));
  };

  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
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
        {/* Render title safely */}
        {typeof title === 'object' ? JSON.stringify(title) : title}

        {/* Render description safely */}
        {description && (
          <>
            <br />
            {typeof description === 'object'
              ? JSON.stringify(description)
              : description}
          </>
        )}
      </Alert>
    </Snackbar>
  );
}
