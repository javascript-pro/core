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
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import 'moment/locale/de';
import { db } from '../../../lib/firebase';
import { useFallmanagerSlice, useLingua, deleteFile, useAutoStepRunner } from '../../Fallmanager';
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
  const [liveFile, setLiveFile] = React.useState<FileMeta | null>(
    files?.[id] || null,
  );
  const [loading, setLoading] = React.useState(!files?.[id]);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState<number | null>(
    null,
  );

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, 'files', id), (docSnap) => {
      if (!docSnap.exists()) return;
      const fileData: FileMeta = { id, ...docSnap.data() } as FileMeta;
      setLiveFile(fileData);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  if (loading || !liveFile) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>{t('LOADING_FILE')}</Typography>
      </Box>
    );
  }

  const summaryText = liveFile.openai?.summary?.[language];

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
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: failMsg,
            description: json.error || failMsg,
          }),
        );
      } else {
        dispatch(toggleFeedback({ severity: 'success', title: successMsg }));
      }
    } catch (err) {
      dispatch(toggleFeedback({ severity: 'error', title: failMsg }));
    } finally {
      setProcessingStep(null);
    }
  };

  const steps = [
    {
      key: 'uploaded',
      label: '1. Uploaded',
      complete: true,
      description: liveFile.fileName || '',
      error: null,
      retryable: false,
      action: null,
    },
    {
      key: 'raw',
      label: '2. Extract Text',
      complete: !!liveFile.rawText,
      description: liveFile.rawText
        ? 'Text extracted'
        : liveFile.rawTextError
          ? `Error: ${liveFile.rawTextError}`
          : 'Extract text from PDF',
      error: liveFile.rawTextError || null,
      retryable: !!liveFile.rawTextError || !liveFile.rawText,
      action: () =>
        runStep(
          2,
          '/api/gl-api/fallmanager/raw',
          'Text extraction done',
          'Text extraction failed',
        ),
    },
    {
      key: 'ai',
      label: '3. AI Summary',
      complete: !!liveFile.openai?.summary,
      description: liveFile.openai?.summary
        ? 'AI summary available'
        : liveFile.openai?.error
          ? `Error: ${liveFile.openai.error}`
          : 'Analyze file using AI',
      error: liveFile.openai?.error || null,
      retryable:
        !!liveFile.rawText &&
        (!liveFile.openai?.summary || !!liveFile.openai?.error),
      action: () =>
        runStep(
          3,
          '/api/gl-api/fallmanager/openai',
          'AI analysis done',
          'AI analysis failed',
        ),
    },
    {
      key: 'thumbnail',
      label: '4. Thumbnail',
      complete: !!liveFile.thumbnail,
      description: liveFile.thumbnail
        ? 'Thumbnail created'
        : liveFile.thumbnailError
          ? `Error: ${liveFile.thumbnailError}`
          : 'Generate a preview thumbnail',
      error: liveFile.thumbnailError || null,
      retryable:
        !!liveFile.openai?.summary &&
        (!liveFile.thumbnail || !!liveFile.thumbnailError),
      action: () =>
        runStep(
          4,
          '/api/gl-api/fallmanager/thumbnail',
          'Thumbnail generation done',
          'Thumbnail generation failed',
        ),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5">
              {liveFile.fileName || t('UNKNOWN_FILENAME')}
            </Typography>
          }
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
              ) : (
                <Stepper orientation="vertical" nonLinear>
                  {steps.map((step, index) => (
                    <Step
                      key={step.key}
                      active
                      completed={step.complete}
                      expanded
                    >
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
                        <Typography
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
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
                        {step.retryable && step.action && (
                          <Button
                            variant="contained"
                            size="small"
                            disabled={processingStep !== null}
                            onClick={step.action}
                            startIcon={
                              processingStep === index + 1 ? (
                                <CircularProgress size={16} />
                              ) : null
                            }
                          >
                            {processingStep === index + 1
                              ? t('PROCESSING')
                              : t('PROCESS')}
                          </Button>
                        )}
                      </StepContent>
                    </Step>
                  ))}
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
                  <>
                    {liveFile.openai.contacts.map((c, i) => (
                      
                        <Box sx={{ width: '100%' }}>
                          {c.name && <Typography>{c.name}</Typography>}
                          {c.role && <Typography>{c.role}</Typography>}
                          {c.phone && <Typography>{c.phone}</Typography>}
                          {c.email && <Typography>{c.email}</Typography>}
                          {c.address && <Typography>{c.address}</Typography>}
                        </Box>
                    ))}
                  </>
                )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{t('ARE_YOU_SURE')}</DialogTitle>
        <DialogContent>
          <Typography fontWeight="bold" mt={1}>
            {liveFile?.fileName || '...'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDelete(false)}>
            {t('CANCEL')}
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? t('DELETING') + '...' : t('DELETE')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
