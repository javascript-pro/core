'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
} from '@mui/material';

export default function SpeakWrite() {
  const [recording, setRecording] = React.useState(false);
  const [audioURL, setAudioURL] = React.useState<string | null>(null);
  const [transcript, setTranscript] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [transcribing, setTranscribing] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          SpeakWrite
        </Typography>

        <Stack spacing={2}>
          {/* Recorder Controls */}
          <Box>
            <Typography variant="subtitle1">Step 1: Record your voice</Typography>
            <Stack direction="row" spacing={2} mt={1}>
              <Button
                variant="contained"
                color={recording ? 'error' : 'primary'}
                onClick={() => setRecording(prev => !prev)}
              >
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              {audioURL && (
                <audio controls src={audioURL} style={{ marginTop: 8 }} />
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Upload */}
          <Box>
            <Typography variant="subtitle1">Step 2: Upload Audio to Firebase</Typography>
            <Button
              variant="outlined"
              disabled={!audioURL || uploading}
              onClick={() => {
                setUploading(true);
                // placeholder for upload logic
                setTimeout(() => setUploading(false), 1000);
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>

          <Divider />

          {/* Transcribe */}
          <Box>
            <Typography variant="subtitle1">Step 3: Transcribe with Whisper</Typography>
            <Button
              variant="outlined"
              disabled={!audioURL || transcribing}
              onClick={() => {
                setTranscribing(true);
                // placeholder for transcription logic
                setTimeout(() => {
                  setTranscript('This is a placeholder transcript.');
                  setTranscribing(false);
                }, 1500);
              }}
            >
              {transcribing ? 'Transcribing...' : 'Transcribe'}
            </Button>
          </Box>

          <Divider />

          {/* Edit Transcript */}
          {transcript && (
            <Box>
              <Typography variant="subtitle1">Step 4: Edit Transcript</Typography>
              <TextField
                multiline
                fullWidth
                rows={6}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </Box>
          )}

          {/* Complete */}
          {transcript && (
            <Box>
              <Typography variant="subtitle1">Step 5: Complete</Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => setCompleted(true)}
              >
                Complete
              </Button>
              {completed && (
                <Typography mt={1} color="success.main">
                  🎉 Done!
                </Typography>
              )}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
