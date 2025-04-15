'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';

export default function GoodFit() {
  const [jobDescription, setJobDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState<null | {
    fit: boolean;
    explanation: string;
    tailoredCV?: string;
  }>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);

    const res = await fetch('/api/goldlabel/good-fit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription }),
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  const handleDownload = () => {
    if (!response?.tailoredCV) return;
    const blob = new Blob([response.tailoredCV], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tailored-cv.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="/svg/good-fit.svg" alt="Good Fit?"/>}
        title="Good Fit?"
        subheader="Paste your job description to find out"
      />
      <CardContent>
        <Typography paragraph>
          Paste a job description and get instant feedback on how well our skills and experience match what you're looking for.You can download a automatically tailored CV
        </Typography>

        <TextField
          label="Job Description"
          multiline
          minRows={6}
          fullWidth
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !jobDescription.trim()}
        >
          {loading ? <CircularProgress size={24} /> : 'Check Fit'}
        </Button>

        {response && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              {response.fit ? '✅ Good Fit' : '❌ Not a Fit'}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {response.explanation}
            </Typography>

            {response.fit && response.tailoredCV && (
              <Button
                onClick={handleDownload}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Download Tailored CV
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
