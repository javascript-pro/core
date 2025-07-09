'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  LinearProgress,
  Skeleton,
  Grid,
  IconButton,
  Tooltip,
  CardActionArea,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useFallmanagerSlice, useLingua, deleteFile } from '../../Fallmanager';
import { useDispatch, toggleFeedback, Icon } from '../../../../gl-core';

type FileMeta = {
  id: string;
  fileName?: string;
  fileSize?: number;
  createdAt?: { seconds: number };
  thumbnail?: string;
  thumbnailProcessing?: boolean;
  rawText?: string;
  rawTextProcessing?: boolean;
  downloadUrl?: string;
  [key: string]: any;
};

export default function FileEdit({ id }: { id: string }) {
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();
  const { files } = useFallmanagerSlice();

  const [liveFile, setLiveFile] = React.useState<FileMeta | null>(files?.[id] || null);
  const [loading, setLoading] = React.useState(!files?.[id]);
  const [processing, setProcessing] = React.useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = React.useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, 'files', id), async (docSnap) => {
      if (!docSnap.exists()) return;

      const fileData: FileMeta = { id, ...docSnap.data() } as FileMeta;
      setLiveFile(fileData);
      setLoading(false);

      if (!fileData.thumbnail && !fileData.thumbnailProcessing && !processing) {
        setProcessing(true);
        try {
          const res = await fetch(`/api/gl-api/fallmanager/thumbnail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
          const json = await res.json();
          if (!res.ok) {
            dispatch(
              toggleFeedback({
                severity: 'error',
                title: 'Error',
                description: json.error || 'Failed to start thumbnail generation.',
              }),
            );
          } else {
            dispatch(
              toggleFeedback({
                severity: 'success',
                title: 'Thumbnail generation started.',
              }),
            );
          }
        } catch (err) {
          console.error('Thumbnail generation error:', err);
          dispatch(
            toggleFeedback({
              severity: 'warning',
              title: 'Unable to trigger thumbnail generation.',
            }),
          );
        } finally {
          setProcessing(false);
        }
        return;
      }

      if (
        fileData.thumbnail &&
        !fileData.rawText &&
        !fileData.rawTextProcessing
      ) {
        try {
          const res = await fetch(`/api/gl-api/fallmanager/raw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
          const json = await res.json();
          if (!res.ok) {
            dispatch(
              toggleFeedback({
                severity: 'error',
                title: 'Text extraction failed',
                description: json.error || 'Could not extract text from PDF.',
              }),
            );
          } else {
            dispatch(
              toggleFeedback({
                severity: 'success',
                title: 'Raw text extracted',
              }),
            );
          }
        } catch (err) {
          console.error('Raw text extraction error:', err);
          dispatch(
            toggleFeedback({
              severity: 'warning',
              title: 'Unable to trigger raw text extraction.',
            }),
          );
        }
      }
    });

    return () => unsub();
  }, [id, processing, dispatch]);

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
          title={liveFile.fileName || t('UNKNOWN_FILENAME')}
        />

        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              {liveFile.thumbnail && liveFile.downloadUrl && (
                <>
                  {!thumbnailLoaded && (
                    <Skeleton
                      variant="rectangular"
                      height={450}
                      width="100%"
                      animation="wave"
                    />
                  )}
                  <CardActionArea
                    onClick={() =>
                      window.open(liveFile.downloadUrl!, '_blank')
                    }
                    title={t('VIEW_FILE')}
                  >
                    <CardMedia
                      component="img"
                      height="450"
                      image={liveFile.thumbnail}
                      alt="PDF thumbnail"
                      onLoad={() => setThumbnailLoaded(true)}
                      onError={() => setThumbnailLoaded(true)}
                      sx={{
                        display: thumbnailLoaded ? 'block' : 'none',
                        borderRadius: 1,
                        cursor: 'pointer',
                      }}
                    />
                  </CardActionArea>
                </>
              )}

              {liveFile.thumbnailProcessing && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t('GENERATING_THUMBNAIL')}
                  </Typography>
                  <LinearProgress />
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              {liveFile.rawTextProcessing && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t('EXTRACTING_TEXT')}
                  </Typography>
                  <LinearProgress />
                </Box>
              )}

              {liveFile.rawText && (
                <Accordion sx={{ mt: 3 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2">
                      {t('EXTRACTED_TEXT')}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      component="pre"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        backgroundColor: 'background.paper',
                        p: 2,
                        maxHeight: 300,
                        overflowY: 'auto',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        fontSize: '0.875rem',
                      }}
                    >
                      {liveFile.rawText.replace(/\s+/g, '')}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              )}
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon icon="delete" />}
            onClick={() => setShowConfirmDelete(true)}
          >
            {t('DELETE')}
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
      >
        <DialogTitle>{t('CONFIRM_DELETE')}</DialogTitle>
        <DialogContent>
          <Typography>{t('ARE_YOU_SURE')}</Typography>
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
