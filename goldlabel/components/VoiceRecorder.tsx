'use client';

import * as React from 'react';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { Icon } from '../';

export default function VoiceRecorder() {
  return (
    <>
      <Alert severity="success" icon={<Icon icon={'speak-write'} />}>
        <AlertTitle>Voice Recorder</AlertTitle>
        <Typography>description</Typography>
      </Alert>
    </>
  );
}
