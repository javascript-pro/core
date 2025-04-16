'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import {Icon, Featured} from '../../'

export default function GoodFit() {
  const [jobDescription, setJobDescription] = React.useState('');
  const [analyzing, setAnalyzing] = React.useState(false);

  return (
    <>
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader
        avatar={<Icon icon="openai"/>}
        title="Good Fit?"
        subheader="Paste your job description to find out"
      />
      <CardContent>
        <Typography paragraph>
          Paste a job description and get instant feedback on how well our
          skills and experience match what you're looking for. You can download an
          automatically tailored CV.
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Job Description"
            placeholder="Paste the job description here..."
            multiline
            fullWidth
            rows={10}
            variant="outlined"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            disabled={!jobDescription || analyzing}
            onClick={() => {
              setAnalyzing(true);
              // Placeholder for API call
              setTimeout(() => setAnalyzing(false), 1500);
            }}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Fit'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
    <Featured />
    </>
  );
}
