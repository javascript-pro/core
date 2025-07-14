'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import 'moment/locale/de';
import { db } from '../../../lib/firebase';
import {
  useFallmanagerSlice,
  useLingua,
  deleteFile,
} from '../../Fallmanager';
import { useDispatch, toggleFeedback, MightyButton } from '../../../../gl-core';

type FileMeta = {
  id: string;
  fileName?: string;
  fileSize?: number;
  createdAt?: { seconds: number };
  rawText?: string;
  rawTextProcessing?: boolean;
  rawTextError?: string;
  rawTextSeverity?: string;
  downloadUrl?: string;
  thumbnail?: string;
  thumbnailProcessing?: boolean;
  thumbnailError?: string;
  openai?: {
    summary?: {
      [lang: string]: string;
    };
    contacts?: {
      name?: string;
      role?: string;
      address?: string;
      phone?: string;
      email?: string;
    }[];
    error?: string;
    processing?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
};

export default function FileEdit({ id }: { id: string }) {
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();
  const { files, language } = useFallmanagerSlice();
  const theme = useTheme();
  const [liveFile, setLiveFile] = React.useState<FileMeta | null>(files?.[id] || null);
  const [loading, setLoading] = React.useState(!files?.[id]);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState<number | null>(null);
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState<any | null>(null);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, 'files', id), (docSnap) => {
      if (!docSnap.exists()) return;
      const fileData: FileMeta = { id, ...docSnap.data() } as FileMeta;
      setLiveFile(fileData);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  const summaryText = liveFile?.openai?.summary?.[language];

  const handleDelete = async () => {
    if (!liveFile) return;
    setDeleting(true);
    try {
      await dispatch(deleteFile(liveFile.id));
      router.push('/fallmanager');
    } finally {
      setDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  const runStep = async (
    step: number,
    url: string,
    successMsg: string,
    failMsg: string,
  ) => {
    setProcessingStep(step);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        dispatch(toggleFeedback({
          severity: 'error',
          title: failMsg,
          description: json.error || failMsg,
        }));
      } else {
        dispatch(toggleFeedback({ severity: 'success', title: successMsg }));
      }
    } catch (err) {
      dispatch(toggleFeedback({ severity: 'error', title: failMsg }));
    } finally {
      setProcessingStep(null);
    }
  };

  // Auto-trigger Steps 2–4
  React.useEffect(() => {
    if (!liveFile || processingStep) return;

    if (!liveFile.rawText && !liveFile.rawTextProcessing) {
      runStep(2, '/api/gl-api/fallmanager/raw', 'Text extraction done', 'Text extraction failed');
      return;
    }

    if (
      liveFile.rawText &&
      !liveFile.openai?.summary &&
      !liveFile.openai?.processing
    ) {
      runStep(3, '/api/gl-api/fallmanager/openai', 'AI analysis done', 'AI analysis failed');
      return;
    }

    if (
      liveFile.openai?.summary &&
      !liveFile.thumbnail &&
      !liveFile.thumbnailProcessing
    ) {
      runStep(4, '/api/gl-api/fallmanager/thumbnail', 'Thumbnail generation done', 'Thumbnail generation failed');
      return;
    }
  }, [liveFile, processingStep]);

  const steps = [
    {
      key: 'uploaded',
      label: '1. Uploaded',
      complete: true,
      description: liveFile?.fileName || '',
      error: null,
      retryable: false,
      action: null,
    },
    {
      key: 'raw',
      label: '2. Extract',
      complete: !!liveFile?.rawText,
      description: liveFile?.rawText
        ? 'Text extracted'
        : liveFile?.rawTextError
          ? `Error: ${liveFile.rawTextError}`
          : 'Extract text from PDF',
      error: liveFile?.rawTextError || null,
      retryable: !!liveFile?.rawTextError || !liveFile?.rawText,
      action: () =>
        runStep(2, '/api/gl-api/fallmanager/raw', 'Text extraction done', 'Text extraction failed'),
    },
    {
      key: 'ai',
      label: '3. Analyse',
      complete: !!liveFile?.openai?.summary,
      description: liveFile?.openai?.summary
        ? 'AI summary available'
        : liveFile?.openai?.error
          ? `Error: ${liveFile.openai.error}`
          : 'Analyze file using AI',
      error: liveFile?.openai?.error || null,
      retryable:
        !!liveFile?.rawText &&
        !liveFile?.openai?.summary &&
        !liveFile?.openai?.processing &&
        (!!liveFile?.openai?.error || !liveFile?.openai?.summary),
      action: () =>
        runStep(3, '/api/gl-api/fallmanager/openai', 'AI analysis done', 'AI analysis failed'),
    },
    {
      key: 'thumbnail',
      label: '4. Make Thumbnail',
      complete: !!liveFile?.thumbnail,
      description: liveFile?.thumbnail
        ? 'Thumbnail created'
        : liveFile?.thumbnailError
          ? `Error: ${liveFile.thumbnailError}`
          : 'Generates a preview thumbnail',
      error: liveFile?.thumbnailError || null,
      retryable:
        !!liveFile?.openai?.summary &&
        (!liveFile?.thumbnail || !!liveFile?.thumbnailError),
      action: () =>
        runStep(4, '/api/gl-api/fallmanager/thumbnail', 'Thumbnail generation done', 'Thumbnail generation failed'),
    },
  ];

  if (loading || !liveFile) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>{t('LOADING_FILE')}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Card>
        <CardHeader
          title={<Typography variant="h5">{liveFile.fileName || t('UNKNOWN_FILENAME')}</Typography>}
          action={
            <MightyButton
              mode="icon"
              variant="outlined"
              color="primary"
              icon="delete"
              label={t('DELETE')}
              onClick={() => setShowConfirmDelete(true)}
            />
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              {liveFile.thumbnail ? (
                <ButtonBase
                  onClick={() =>
                    liveFile.downloadUrl &&
                    window.open(liveFile.downloadUrl, '_blank', 'noopener,noreferrer')
                  }
                  sx={{ width: '100%', display: 'block', borderRadius: 2 }}
                >
                  <Card
                    sx={{
                      mt: 2,
                      width: '100%',
                      maxWidth: 240,
                      mx: 'auto',
                      aspectRatio: '3 / 4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={liveFile.thumbnail}
                      alt="Thumbnail"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Card>
                </ButtonBase>
              ) : (
                <Stepper orientation="vertical" nonLinear>
                  {steps.map((step, index) => {
                    const isAI = step.key === 'ai';
                    const isProcessing = isAI
                      ? liveFile?.openai?.processing || processingStep === index + 1
                      : processingStep === index + 1;

                    return (
                      <Step key={step.key} active completed={step.complete} expanded>
                        <StepLabel
                          sx={{
                            '& .MuiStepLabel-label': {
                              color: step.complete
                                ? theme.palette.text.disabled
                                : theme.palette.text.primary,
                            },
                            '& .MuiStepIcon-root': {
                              color: step.complete
                                ? theme.palette.text.disabled
                                : theme.palette.primary.main,
                            },
                          }}
                        >
                          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                            {step.label}
                            {!step.complete && step.error && (
                              <Typography
                                component="span"
                                sx={{
                                  ml: 1,
                                  fontSize: '1.2em',
                                  color: theme.palette.error.main,
                                }}
                              >
                                ⟳
                              </Typography>
                            )}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          {step.description && (
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 1,
                                color:
                                  step.error && !step.complete
                                    ? theme.palette.error.main
                                    : 'inherit',
                              }}
                            >
                              {step.description}
                            </Typography>
                          )}
                          {(step.action &&
                            (step.retryable || (step.key === 'ai' && liveFile?.openai?.processing))) && (
                            <Button
                              variant="contained"
                              size="small"
                              disabled={processingStep !== null || isProcessing}
                              onClick={step.action}
                              startIcon={isProcessing ? <CircularProgress size={16} /> : null}
                            >
                              {isProcessing ? t('PROCESSING') : t('PROCESS')}
                            </Button>
                          )}
                        </StepContent>
                      </Step>
                    );
                  })}
                </Stepper>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              {summaryText && (
                <Typography variant="h6" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                  {summaryText}
                </Typography>
              )}
              {Array.isArray(liveFile.openai?.contacts) &&
                liveFile.openai.contacts.length > 0 && (
                  <Box sx={{ p: 1 }}>
                    {liveFile.openai.contacts.map((c, i) => (
                      <Box key={i} sx={{ width: '100%', mb: 2 }}>
                        {c.name && <Typography variant="h6">{c.name}</Typography>}
                        {c.role && <Typography variant="body1">{c.role}</Typography>}
                        {c.address && <Typography variant="body1">{c.address}</Typography>}
                        {c.phone && <Typography variant="body1" sx={{ my: 1 }}>{c.phone}</Typography>}
                        {c.email && <Typography variant="body1">{c.email}</Typography>}

                        <MightyButton
                          sx={{ mt: 2 }}
                          variant="contained"
                          label={t('SAVE_CONTACT')}
                          icon="save"
                          onClick={() => {
                            setSelectedContact(c);
                            setShowSaveDialog(true);
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDelete} onClose={() => setShowConfirmDelete(false)} fullWidth maxWidth="xs">
        <DialogTitle>{t('DELETE')} {liveFile?.fileName || '...'}</DialogTitle>
        <DialogContent>
          <Typography fontWeight="bold" mt={1}>{t('ARE_YOU_SURE')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDelete(false)}>{t('CANCEL')}</Button>
          <Button onClick={handleDelete} color="primary" variant="contained" disabled={deleting}>
            {deleting ? t('DELETING') + '...' : t('DELETE')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{t('SAVE_CONTACT')}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Name" value={selectedContact?.name || ''} fullWidth disabled />
          <TextField label="Role" value={selectedContact?.role || ''} fullWidth disabled />
          <TextField label="Address" value={selectedContact?.address || ''} fullWidth disabled />
          <TextField label="Phone" value={selectedContact?.phone || ''} fullWidth disabled />
          <TextField label="Email" value={selectedContact?.email || ''} fullWidth disabled />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>{t('CLOSE')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
