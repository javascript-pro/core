'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Grid,
  Skeleton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import moment from 'moment';
import 'moment/locale/de';
import { db } from '../../../lib/firebase';
import { useFallmanagerSlice, useLingua, deleteFile } from '../../Fallmanager';
import {
  useDispatch,
  toggleFeedback,
  Icon,
  MightyButton,
  useIsMobile,
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
  openai?: any;
  [key: string]: any;
};

export default function FileEdit({ id }: { id: string }) {
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { files, language } = useFallmanagerSlice();

  const [liveFile, setLiveFile] = React.useState<FileMeta | null>(
    files?.[id] || null,
  );
  const [loading, setLoading] = React.useState(!files?.[id]);
  const [processing, setProcessing] = React.useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [rawTextFailed, setRawTextFailed] = React.useState(false);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, 'files', id), async (docSnap) => {
      if (!docSnap.exists()) return;
      const fileData: FileMeta = { id, ...docSnap.data() } as FileMeta;
      setLiveFile(fileData);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  const formattedDate = React.useMemo(() => {
    if (!liveFile?.createdAt?.seconds) return null;
    moment.locale(language === 'de' ? 'de' : 'en');
    return moment.unix(liveFile.createdAt.seconds).format('h:mma dddd Do MMMM');
  }, [liveFile?.createdAt?.seconds, language]);

  const currentStep = !liveFile?.rawText ? 2 : !liveFile?.openai ? 3 : 0;

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

  const handleTriggerRawText = async () => {
    setProcessing(true);
    try {
      const res = await fetch(`/api/gl-api/fallmanager/raw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setRawTextFailed(true);
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: t('TEXT_EXTRACTION_FAILED'),
            description: json.error || 'PDF.co error.',
          }),
        );
      } else {
        dispatch(
          toggleFeedback({
            severity: 'success',
            title: t('TEXT_EXTRACTION_STARTED'),
          }),
        );
      }
    } catch (err) {
      setRawTextFailed(true);
      dispatch(
        toggleFeedback({
          severity: 'warning',
          title: t('TEXT_EXTRACTION_FAILED'),
        }),
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleTriggerAnalysis = async () => {
    setProcessing(true);
    try {
      const res = await fetch(`/api/gl-api/fallmanager/ki`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: t('TEXT_ANALYSIS_FAILED'),
            description: json.error || 'OpenAI error.',
          }),
        );
      } else {
        dispatch(
          toggleFeedback({
            severity: 'success',
            title: t('TEXT_ANALYSIS_STARTED'),
          }),
        );
      }
    } catch (err) {
      dispatch(
        toggleFeedback({
          severity: 'warning',
          title: t('TEXT_ANALYSIS_FAILED'),
        }),
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading || !liveFile) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress sx={{ mr: 2 }} />
        <Typography sx={{ mt: 2 }}>{t('LOADING_FILE')}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Tooltip title={t('ALL_FILES')}>
              <IconButton
                color="primary"
                onClick={() => router.push('/fallmanager')}
              >
                <Icon icon="left" />
              </IconButton>
            </Tooltip>
          }
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
            {/* LEFT COLUMN */}
            <Grid size={{ xs: 12, md: 8 }}>
              {/* Step 1 */}
              <Accordion disableGutters expanded={false} sx={{ mt: 2, boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                <AccordionSummary>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon icon="tick" color="success" />
                    <Typography variant="h6">{t('STEP_1_UPLOAD_FILE')}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    {liveFile.fileName || '...'} {t('UPLOADED_AT')} {formattedDate || '...'}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Step 2 */}
              <Accordion disableGutters defaultExpanded={currentStep === 2} sx={{ mt: 2, boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                <AccordionSummary>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {liveFile.rawText ? (
                      <Icon icon="tick" color="success" />
                    ) : liveFile.rawTextProcessing ? (
                      <CircularProgress sx={{ mr: 2 }} />
                    ) : (
                      <Icon icon="work" color="disabled" />
                    )}
                    <Typography variant="h6">{t('STEP_2_EXTRACT_TEXT')}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {liveFile.rawText ? (
                    <>
                      <Typography variant="body2" gutterBottom>
                        {t('STEP_2_TEXT_EXTRACTED')}
                      </Typography>
                      <Accordion disableGutters sx={{ boxShadow: 'none', border: 'none', '&::before': { display: 'none' }, mt: 1 }}>
                        <AccordionSummary expandIcon={null}>
                          <Box sx={{ mr: 1 }}>
                            <Icon icon="api" color="primary" />
                          </Box>
                          <Typography>{t('SHOW_EXTRACTED_TEXT')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {JSON.stringify(liveFile.rawText, null, 2)}
                          </pre>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" gutterBottom>{t('STEP_2_DESCRIPTION')}</Typography>
                      {liveFile.rawTextSeverity === 'error' && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {liveFile.rawTextError || t('TEXT_EXTRACTION_FAILED')}
                        </Alert>
                      )}
                      <MightyButton
                        sx={{ mt: 2 }}
                        icon="work"
                        variant="contained"
                        label={t('EXTRACT_TEXT')}
                        onClick={handleTriggerRawText}
                        disabled={processing}
                      />
                    </>
                  )}
                </AccordionDetails>
              </Accordion>

              {/* Step 3 */}
              <Accordion disableGutters defaultExpanded={currentStep === 3} sx={{ mt: 2, boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                <AccordionSummary>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {liveFile.openai?.error ? (
                      <Icon icon="warning" color="error" />
                    ) : liveFile.openai?.processing ? (
                      <CircularProgress sx={{ mr: 2 }} />
                    ) : liveFile.openai ? (
                      <Icon icon="tick" color="success" />
                    ) : (
                      <Icon icon="work" color="disabled" />
                    )}
                    <Typography variant="h6">{t('STEP_3_ANALYZE_TEXT')}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" gutterBottom>{t('STEP_3_DESCRIPTION')}</Typography>
                  {liveFile.openai?.error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {liveFile.openai.error}
                    </Alert>
                  )}
                  {liveFile.openai?.processing ? null : liveFile.openai && !liveFile.openai?.error ? (
                    <Accordion disableGutters sx={{ boxShadow: 'none', border: 'none', '&::before': { display: 'none' }, mt: 1 }}>
                      <AccordionSummary expandIcon={null}>
                        <Box sx={{ mr: 1 }}>
                          <Icon icon="api" color="primary" />
                        </Box>
                        <Typography>{t('SHOW_STRUCTURED_DATA')}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                          {JSON.stringify(liveFile.openai, null, 2)}
                        </pre>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <MightyButton
                      sx={{ mt: 2 }}
                      icon="work"
                      variant="contained"
                      label={t('ANALYSE')}
                      onClick={handleTriggerAnalysis}
                      disabled={processing}
                    />
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Skeleton
  variant="rectangular"
  animation="pulse"
  sx={{
    width: '100%',
    maxWidth: 240,
    height: 320, // e.g. portrait 240x320 (3:4 ratio)
    borderRadius: 2,
  }}
/>

              </Box>
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
