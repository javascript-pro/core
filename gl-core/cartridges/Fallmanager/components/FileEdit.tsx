// /Users/goldlabel/GitHub/core/gl-core/cartridges/Fallmanager/components/FileEdit.tsx
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

  const [liveFile, setLiveFile] = React.useState<FileMeta | null>(
    files?.[id] || null,
  );
  const [loading, setLoading] = React.useState(!files?.[id]);
  const [processing, setProcessing] = React.useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [rawTextFailed, setRawTextFailed] = React.useState(false);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, 'files', id), (docSnap) => {
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

  if (loading || !liveFile) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress sx={{ mr: 2 }} />
        <Typography sx={{ mt: 2 }}>{t('LOADING_FILE')}</Typography>
      </Box>
    );
  }

  const summaryText = liveFile.openai?.summary?.[language];

  const currentStep = !liveFile?.rawText
    ? 2
    : !liveFile?.openai
    ? 3
    : !liveFile?.thumbnail
    ? 4
    : 0;

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

  const handleTriggerThumbnail = async () => {
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
            title: t('THUMBNAIL_FAILED'),
            description: json.error || 'Thumbnail generation failed.',
          }),
        );
      } else {
        dispatch(
          toggleFeedback({
            severity: 'success',
            title: t('THUMBNAIL_STARTED'),
          }),
        );
      }
    } catch (err) {
      dispatch(
        toggleFeedback({
          severity: 'warning',
          title: t('THUMBNAIL_FAILED'),
        }),
      );
    } finally {
      setProcessing(false);
    }
  };

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
              {/* STEP 1–4 Placeholder */}

              {summaryText && (
                <Typography variant="h6" sx={{ mt: 3, whiteSpace: 'pre-wrap' }}>
                  {summaryText}
                </Typography>
              )}

              {Array.isArray(liveFile.openai?.contacts) &&
                liveFile.openai.contacts.length > 0 && (
                  <Card sx={{width: "100%"}}>
                  <Box sx={{ mb: 1 }}>
                    
                    {liveFile.openai.contacts.map((c, i) => (
                      <CardContent
                        key={i}
                      >
                        {c.name && (
                          <Typography>
                            {c.name}
                          </Typography>
                        )}
                        {c.role && (
                          <Typography>
                            {c.role}
                          </Typography>
                        )}
                        {c.phone && (
                          <Typography>
                            {c.phone}
                          </Typography>
                        )}
                        {c.email && (
                          <Typography>
                            {c.email}
                          </Typography>
                        )}
                        {c.address && (
                          <Typography>
                            {c.address}
                          </Typography>
                        )}
                      </CardContent>
                    ))}
                  </Box>
                  </Card>
                )}

              {!liveFile.thumbnail && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTriggerThumbnail}
                  disabled={processing}
                  sx={{ mt: 2 }}
                >
                  {t('GENERATE_THUMBNAIL')}
                </Button>
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
          <Button onClick={() => setShowConfirmDelete(false)}>{t('CANCEL')}</Button>
          <Button onClick={handleDelete} color="primary" variant="contained" disabled={deleting}>
            {deleting ? t('DELETING') + '...' : t('DELETE')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
