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
  LinearProgress,
  Stack,
  ButtonBase,
  Box,
} from '@mui/material';
import {
  useFallmanagerSlice,
  useLingua,
  toggleAICase,
  updateAICase,
  deleteFile,
  analyse,
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

  const handleReset = () => {
    dispatch(updateAICase({ uploaded: null }));
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

    handleFeedback('info', t('UPLOAD_STARTING'));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/gl-api/fallmanager/hochladen', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      handleFeedback('success', t('UPLOAD_SUCCESS'));
      dispatch(updateAICase({ uploaded: data }));
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

              {!uploading && (
                <ButtonBase
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '1px dashed',
                    borderColor: 'divider',
                    backgroundColor: file ? 'background.paper' : 'action.hover',
                    p: 2,
                    textAlign: 'left',
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
                </ButtonBase>
              )}

              {uploading && <LinearProgress sx={{ mt: 2 }} />}
            </>
          )}

          {uploadedData && (
            <Stack spacing={2}>
              <FirestoreSubscription docId={uploadedData.docId} onReset={handleReset} />
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

function FirestoreSubscription({
  docId,
  onReset,
}: {
  docId: string;
  onReset: () => void;
}) {
  const t = useLingua();
  const dispatch = useDispatch();
  const [docData, setDocData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const docRef = useMemo(() => doc(db, 'AIAssist', docId), [docId]);

  const handleViewClick = () => {
    if (docData?.downloadUrl) {
      window.open(docData.downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteFile(docId));
  };

  const handleAnalyseClick = () => {
    dispatch(analyse(docId));
  };

  useEffect(() => {
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          setDocData(snap.data());
          setLoading(false);
        } else {
          onReset();
        }
      },
      (err) => {
        console.error(err);
      },
    );
    return () => unsub();
  }, [docRef, onReset]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`/api/gl-api/fallmanager/ki?id=${docId}`);

        if (!res.ok) {
          console.warn('API returned error:', res.status);
          return;
        }

        const text = await res.text();
        if (!text) {
          console.warn('Empty response from analysis endpoint');
          return;
        }

        try {
          const json = JSON.parse(text);
          setAnalysisResult(json);
        } catch (err) {
          console.error('Invalid JSON in analysis response:', err);
        }
      } catch (err) {
        console.error('Failed to fetch analysis result:', err);
      }
    };

    if (docData?.AIAssisted && !analysisResult) {
      fetchAnalysis();
    }
  }, [docData, docId, analysisResult]);

  if (loading) return <LinearProgress sx={{ mt: 2 }} />;
  if (!docData) return null;

  const hasBeenAnalysed = !!docData?.AIAssisted;
  const date = new Date(docData.createdAt?.seconds * 1000).toLocaleString();

  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Stack spacing={1}>
        {hasBeenAnalysed && analysisResult ? (
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        ) : (
          <>
            <CardHeader
              title={docData.fileName}
              subheader={
                <>
                  {date} · {docData.mimeType} ·{' '}
                  {(docData.fileSize / 1024).toFixed(1)} KB
                </>
              }
              action={
                <>
                  <MightyButton
                    mode="icon"
                    label={t('VIEW')}
                    icon="link"
                    onClick={handleViewClick}
                  />
                  <MightyButton
                    mode="icon"
                    label={t('DELETE')}
                    icon="delete"
                    onClick={handleDeleteClick}
                  />
                </>
              }
            />

            <MightyButton
              label={t('ANALYSE')}
              variant="contained"
              icon="openai"
              onClick={handleAnalyseClick}
            />
          </>
        )}
      </Stack>
    </Box>
  );
}
