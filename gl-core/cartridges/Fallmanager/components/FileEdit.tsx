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
  Divider,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActionArea,
  IconButton,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useFallmanagerSlice, useLingua } from '../../Fallmanager';
import { useDispatch, toggleFeedback, Icon } from '../../../../gl-core';

type FileMeta = {
  id: string;
  fileName?: string;
  fileSize?: number;
  createdAt?: { seconds: number };
  thumbnail?: string;
  thumbnailProcessing?: boolean;
  downloadUrl?: string;
  [key: string]: any;
};

export default function FileEdit({ id }: { id: string }) {
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();
  const { files } = useFallmanagerSlice();

  const [liveFile, setLiveFile] = useState<FileMeta | null>(files?.[id] || null);
  const [loading, setLoading] = useState(!files?.[id]);
  const [processing, setProcessing] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'files', id), async (docSnap) => {
      if (docSnap.exists()) {
        const fileData: FileMeta = { id, ...docSnap.data() } as FileMeta;
        setLiveFile(fileData);
        setLoading(false);

        if (
          !fileData.thumbnail &&
          !fileData.thumbnailProcessing &&
          !processing
        ) {
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
                  description:
                    json.error || 'Failed to start thumbnail generation.',
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
        }
      }
    });

    return () => unsub();
  }, [id, processing, dispatch]);

  if (loading || !liveFile) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>{t('LOADING_FILE')}</Typography>
      </Box>
    );
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Tooltip title={t('ALL_FILES')}>
            <IconButton color="primary" onClick={() => router.push('/fallmanager')}>
              <Icon icon="left" />
            </IconButton>
          </Tooltip>
        }
        title={liveFile.fileName || t('UNKNOWN_FILENAME')}
        
      />

      <CardContent>
        <Grid container spacing={2}>
          {/* File details in Accordion */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{t('FILE_DETAILS')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ mb: 2 }} />
                <List dense disablePadding>
                  {Object.entries(liveFile).map(([key, value]) => {
                    if (key === 'thumbnail' || key === 'downloadUrl') return null;
                    if (key === 'createdAt' && value?.seconds) {
                      value = moment.unix(value.seconds).format('LLL');
                    }
                    return (
                      <ListItem key={key} disableGutters>
                        <ListItemText
                          primary={key}
                          secondary={
                            typeof value === 'string' || typeof value === 'number'
                              ? value.toString()
                              : JSON.stringify(value, null, 2)
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
            <Typography sx={{m:2}}>
            {
              `${liveFile.fileSize ? (liveFile.fileSize / 1024).toFixed(1) + ' KB' : '—'} — ` +
              `${liveFile.createdAt?.seconds ? moment.unix(liveFile.createdAt.seconds).fromNow() : t('UNKNOWN_DATE')}`
            }
            </Typography>

          </Grid>

          {/* Thumbnail & progress */}
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
                  onClick={() => window.open(liveFile.downloadUrl!, '_blank')}
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
        </Grid>
      </CardContent>
    </Card>
  );
}
