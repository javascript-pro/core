'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import {
  Dialog,
  CardHeader,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Paper,
  ButtonBase,
} from '@mui/material';
import {
  useFallmanagerSlice,
  useLingua,
  toggleAICase,
} from '../../Fallmanager';
import { useDispatch, Icon } from '../../../../gl-core';

export default function AIAssisted() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { aiCase } = useFallmanagerSlice();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadedData, setUploadedData] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(toggleAICase(false));
    setFile(null);
    setMessage(null);
    setUploadedData(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] || null;
    setFile(uploaded);
    setMessage(null);
    setUploadedData(null);

    if (uploaded) {
      await handleSubmit(uploaded);
    }
  };

  const handleSubmit = async (file: File) => {
    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/gl-api/fallmanager/hochladen', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setMessage({ type: 'success', text: 'Upload erfolgreich' });
      setUploadedData(data);
      console.log('AI Assist upload created:', data.docId);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Unbekannter Fehler' });
    } finally {
      setUploading(false);
    }
  };

  if (!aiCase.open) return null;

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <CardHeader avatar={<Icon icon="aicase" />} title={t('NEW_AI_CASE')} />
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2">{t('NEW_CASE_HELP_AI')}</Typography>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="application/pdf"
            onChange={handleFileChange}
          />

          <ButtonBase
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px dashed',
              borderColor: 'divider',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: 2,
                textAlign: 'left',
                backgroundColor: file ? 'background.paper' : 'action.hover',
              }}
            >
              {file ? (
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2">{file.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {file.type} · {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t('UPLOAD_PDF')}
                </Typography>
              )}
            </Paper>
          </ButtonBase>

          {uploading && <CircularProgress size={24} sx={{ mt: 1 }} />}
          {message && <Alert severity={message.type}>{message.text}</Alert>}

          {uploadedData && (
            <Paper variant="outlined" sx={{ p: 2, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 12 }}>
              <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
            </Paper>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={uploading}>
          {t('CANCEL') || 'Cancel'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
