'use client';

import * as React from 'react';
import { useRef, useState, useMemo, useEffect } from 'react';
import {
  Dialog,
  CardHeader,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Paper,
  ButtonBase,
  Alert,
  Box,
} from '@mui/material';
import {
  useFallmanagerSlice,
  useLingua,
  toggleAICase,
  updateAICase,
} from '../../Fallmanager';
import {
  useDispatch,
  Icon,
  MightyButton,
  toggleFeedback,
} from '../../../../gl-core';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function AIAssisted() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { aiCase } = useFallmanagerSlice();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(toggleAICase(false));
    dispatch(updateAICase({ open: false, uploaded: null }));
    setFile(null);
  };

  const handleFeedback = (
    severity: 'success' | 'error' | 'info' | 'warning',
    title: string,
  ) => {
    dispatch(toggleFeedback({ severity, title }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] || null;
    setFile(uploaded);
    dispatch(updateAICase({ uploaded: null }));

    if (uploaded) {
      await handleSubmit(uploaded);
    }
  };

  const handleSubmit = async (file: File) => {
    setUploading(true);

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

      handleFeedback('success', t('UPLOAD_SUCCESS'));
      dispatch(updateAICase({ uploaded: data }));
      console.log('AI Assist upload created:', data.docId);
    } catch (err: any) {
      handleFeedback('error', err.message || 'Unbekannter Fehler');
    } finally {
      setUploading(false);
    }
  };

  if (!aiCase.open) return null;

  const uploadedData = aiCase.uploaded;

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <CardHeader avatar={<Icon icon="aicase" />} title={t('NEW_AI_CASE')} />
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2">{t('NEW_CASE_HELP_AI')}</Typography>

          {!uploadedData && (
            <>
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

              {uploading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </>
          )}

          {uploadedData && (
            <Stack spacing={2}>
              <FirestoreSubscription docId={uploadedData.docId} />
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={uploading}>
          {t('CANCEL')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function FirestoreSubscription({ docId }: { docId: string }) {
  const t = useLingua();
  const [docData, setDocData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const docRef = useMemo(() => doc(db, 'AIAssist', docId), [docId]);

  useEffect(() => {
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          setDocData(snap.data());
          setLoading(false);
        } else {
          setError('Dokument nicht gefunden');
        }
      },
      (err) => {
        console.error(err);
        setError('Fehler beim Abonnieren');
      },
    );
    return () => unsub();
  }, [docRef]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (loading) return <CircularProgress size={20} />;

  const hasOpenAI = !!docData?.openai;
  const date = new Date(docData.createdAt?.seconds * 1000).toLocaleString();

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="h6">{docData.fileName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {docData.mimeType} · {(docData.fileSize / 1024).toFixed(1)} KB
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('DATE')}: {date}
        </Typography>
        <Button
          variant="outlined"
          href={docData.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<Icon icon="link" />}
          sx={{ alignSelf: 'flex-start' }}
        >
          {t('VIEW')}
        </Button>

        {!hasOpenAI && (
          <MightyButton
            label={t('ANALYSE')}
            variant="contained"
            icon="openai"
          />
        )}
      </Stack>
    </Paper>
  );
}
