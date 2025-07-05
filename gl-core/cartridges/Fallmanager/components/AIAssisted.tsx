'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useMemo } from 'react';
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
      if (!res.ok) throw new Error(data?.error || 'Upload failed');

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
              <FirestoreSubscription
                docId={uploadedData.docId}
                onReset={handleReset}
              />
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
  const { language } = useFallmanagerSlice();
  const dispatch = useDispatch();
  const [docData, setDocData] = useState<any | null>(null);
  const [processingStep, setProcessingStep] = useState<
    'waiting' | 'converting' | 'converted' | 'analyzing' | 'done'
  >('waiting');
  const [error, setError] = useState<string | null>(null);

  const docRef = useMemo(() => doc(db, 'AIAssist', docId), [docId]);

  const updateFeedback = (
    message: string,
    severity: 'info' | 'success' | 'error' = 'info',
  ) => {
    dispatch(toggleFeedback({ severity, title: message }));
  };

  useEffect(() => {
    const unsub = onSnapshot(
      docRef,
      async (snap) => {
        if (!snap.exists()) return onReset();

        const data = snap.data();
        setDocData(data);

        // Step 1: Trigger conversion if not done
        if (!data?.docData?.rawText && processingStep === 'waiting') {
          setProcessingStep('converting');
          updateFeedback('Extrahiere Text mit PDF-Co...');

          try {
            const res = await fetch('/api/gl-api/fallmanager/pdf-co', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: docId }),
            });

            const result = await res.json();
            if (!res.ok)
              throw new Error(result.error || 'PDF-Analyse fehlgeschlagen');
            updateFeedback('Text erfolgreich extrahiert', 'success');
            setProcessingStep('converted');
          } catch (e: any) {
            setError(e.message);
            updateFeedback(e.message || 'Fehler beim PDF-Co-Aufruf', 'error');
          }
        }

        // Step 2: Trigger KI if rawText exists and openai is not set
        if (
          data?.docData?.rawText &&
          !data?.docData?.openai &&
          processingStep === 'converted'
        ) {
          setProcessingStep('analyzing');
          updateFeedback('Starte KI-Analyse...');

          try {
            const res = await fetch('/api/gl-api/fallmanager/ki', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: docId,
                rawText: data.docData.rawText,
              }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'KI fehlgeschlagen');
            updateFeedback('KI erfolgreich abgeschlossen', 'success');
            setProcessingStep('done');
          } catch (e: any) {
            setError(e.message);
            updateFeedback(e.message || 'Fehler bei KI-Aufruf', 'error');
          }
        }
      },
      (err) => {
        console.error(err);
        updateFeedback('Fehler bei Dokument-Überwachung', 'error');
        onReset();
      },
    );

    return () => unsub();
  }, [docRef, docId, processingStep]);

  if (!docData) return <LinearProgress sx={{ mt: 2 }} />;

  const summaryText =
    docData?.docData?.openai?.summary?.[language] ||
    docData?.docData?.openai?.summary?.['en'];

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={1}>
        <CardHeader
          title={docData.fileName}
          subheader={`${new Date(docData.createdAt?.seconds * 1000).toLocaleString()} · ${docData.mimeType} · ${(docData.fileSize / 1024).toFixed(1)} KB`}
          action={
            <>
              <MightyButton
                mode="icon"
                label={t('VIEW')}
                icon="link"
                onClick={() => window.open(docData.downloadUrl, '_blank')}
              />
              <MightyButton
                mode="icon"
                label={t('DELETE')}
                icon="delete"
                onClick={() => dispatch(deleteFile(docId))}
              />
            </>
          }
        />

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        {summaryText && (
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, whiteSpace: 'pre-wrap', mb: 2 }}
          >
            {summaryText}
          </Typography>
        )}

        {docData?.docData?.openai && (
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              backgroundColor: 'action.hover',
              borderRadius: 1,
              p: 2,
              mt: 1,
            }}
          >
            {JSON.stringify(docData.docData.openai, null, 2)}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
