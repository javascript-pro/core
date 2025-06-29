// core/gl-core/cartridges/Fallmanager/components/uploads/UploadHandler.tsx
'use client';
import * as React from 'react';
import { Box, Typography, LinearProgress, Alert, Avatar } from '@mui/material';
import UploadField from './UploadField';

export default function UploadHandler() {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any>(null);

  const handleSelect = async (file: File | null) => {
    setError(null);
    setResult(null);
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setProgress(0);

    try {
      const res = await fetch('/api/gl-api/fallmanager/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Upload failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setUploading(false);
      setProgress(100);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      {!uploading && (
        <UploadField label="Upload PDF" accept=".pdf" onSelect={handleSelect} />
      )}
      {uploading && (
        <>
          <Typography variant="body2" sx={{ my: 1 }}>
            Uploading...
          </Typography>
          <LinearProgress />
        </>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {result && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="success">File uploaded!</Alert>
          <Typography variant="body2">File ID: {result.fileId}</Typography>
          <Typography variant="body2">
            <a href={result.pdfUrl} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Thumbnail Preview:</Typography>
            <Avatar
              src={result.thumbUrl}
              variant="square"
              sx={{ width: 128, height: 180, mt: 1 }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
