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
  Skeleton,
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
import { useFallmanagerSlice, useLingua, deleteFile } from '../../Fallmanager';
import {
  useDispatch,
  toggleFeedback,
  MightyButton,
} from '../../../../gl-core';

type FileMeta = {
  id: string;
  fileName?: string;
  fileSize?: number;
  createdAt?: { seconds: number };
  rawText?: string;
  rawTextProcessing?: boolean;
  rawTextSeverity?: string;
  rawTextError?: string;
  downloadUrl?: string;
  thumbnail?: string;
  thumbnailProcessing?: boolean;
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
  const [processingStep, setProcessingStep] = React.useState<number | null>(null);

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
        dispatch(
          toggleFeedback({
            severity: 'success',
            title: successMsg,
          }),
        );
      }
    } catch (err) {
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: failMsg,
        }),
      );
    } finally {
      setProcessingStep(null);
    }
  };

  const steps = [
    {
      label: '1. Uploaded',
      complete: true,
      description: liveFile.fileName || '',
      action: null,
    },
    {
      label: '2. Extract Text',
      complete: !!liveFile.rawText,
      description: liveFile.rawText
        ? 'Text extracted'
        : 'Extract text from PDF',
      action: !liveFile.rawText
        ? () =>
            runStep(
              2,
              '/api/gl-api/fallmanager/raw',
              'Text extraction done',
              'Text extraction failed',
            )
        : null,
    },
    {
      label: '3. AI Summary',
      complete: !!liveFile.openai?.summary,
      description: liveFile.openai?.summary
        ? 'AI summary available'
        : 'Analyze file using AI',
      action: !liveFile.openai
        ? () =>
            runStep(
              3,
              '/api/gl-api/fallmanager/openai',
              'AI analysis started',
              'AI analysis failed',
            )
        : null,
    },
    {
      label: '4. Thumbnail',
      complete: !!liveFile.thumbnail,
      description: liveFile.thumbnail
        ? 'Thumbnail created'
        : 'Generate a preview thumbnail',
      action: !liveFile.thumbnail
        ? () =>
            runStep(
              4,
              '/api/gl-api/fallmanager/thumbnail',
              'Thumbnail generation done',
              'Thumbnail generation failed',
            )
        : null,
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
            <Grid size={{ xs: 12, md: 8 }}>
              <Stepper orientation="vertical" nonLinear>
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    active={true}
                    completed={step.complete}
                    expanded
                  >
                    <StepLabel>
                      <Typography>{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {step.description}
                      </Typography>
                      {step.action && (
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
                          Run Step
                        </Button>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              {summaryText && (
                <Typography variant="h6" sx={{ mt: 3, whiteSpace: 'pre-wrap' }}>
                  {summaryText}
                </Typography>
              )}

              {Array.isArray(liveFile.openai?.contacts) &&
                liveFile.openai.contacts.length > 0 && (
                  <>
                    {liveFile.openai.contacts.map((c, i) => (
                      <ButtonBase
                        key={`contact_${i}`}
                        sx={{
                          my: 1,
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          borderLeft: '1px solid ' + theme.palette.divider,
                        }}
                      >
                        <CardContent sx={{ width: '100%' }}>
                          {c.name && <Typography>{c.name}</Typography>}
                          {c.role && <Typography>{c.role}</Typography>}
                          {c.phone && <Typography>{c.phone}</Typography>}
                          {c.email && <Typography>{c.email}</Typography>}
                          {c.address && <Typography>{c.address}</Typography>}
                        </CardContent>
                      </ButtonBase>
                    ))}
                  </>
                )}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
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
                {liveFile.thumbnail ? (
                  <CardMedia
                    component="img"
                    image={liveFile.thumbnail}
                    alt="Thumbnail"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    sx={{ width: '100%', height: '100%' }}
                  />
                )}
              </Card>
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
