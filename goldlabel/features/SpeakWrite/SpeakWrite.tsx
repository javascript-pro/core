'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
} from '@mui/material';
import { Icon, Featured } from '../../';

export default function SpeakWrite() {
  const [recording, setRecording] = React.useState(false);
  const [audioURL, setAudioURL] = React.useState<string | null>(null);
  const [transcript, setTranscript] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [transcribing, setTranscribing] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <CardHeader
          avatar={<Icon icon="speak-write" />}
          title="SpeakWrite"
          subheader="Foreseen by Orwell in 1984, built for reals just now. By us"
        />

        <CardContent>Open Source AI propaganda generator</CardContent>
      </Card>
      <Featured />
    </>
  );
}
