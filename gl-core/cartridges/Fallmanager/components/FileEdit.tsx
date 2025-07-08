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
  Alert,
  Skeleton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import {
  useFallmanagerSlice,
  useLingua,
} from '../../Fallmanager';
import { useDispatch } from '../../../../gl-core';

type FileMeta = {
  id: string;
  fileName?: string;
  fileSize?: number;
  createdAt?: { seconds: number };
  thumbnail?: string;
  thumbnailProcessing?: boolean;
};

export default function FileEdit({ id }: { id: string }) {
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();
  const { files } = useFallmanagerSlice();

  const [liveFile, setLiveFile] = useState<FileMeta | null>(
    files?.[id] || null
  );
  const [loading, setLoading] = useState(!files?.[id]);
  const [processing, setProcessing] = useState(false);
  const [generationMessage, setGenerationMessage] = useState<string | null>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'files', id), async (docSnap) => {
      if (docSnap.exists()) {
        const fileData: FileMeta = { id, ...docSnap.data() } as FileMeta;
        setLiveFile(fileData);
        setLoading(false);

        if (!fileData.thumbnail && !fileData.thumbnailProcessing && !processing) {
          setProcessing(true);
          setGenerationMessage(null);

          try {
            const res = await fetch(`/api/gl-api/fallmanager/thumbnail`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id }),
            });

            const json = await res.json();
            if (!res.ok) {
              setGenerationMessage(`❌ ${json.error || 'Unknown error'}`);
            } else {
              setGenerationMessage('✅ Thumbnail generation started');
            }
          } catch (err) {
            console.error('Thumbnail generation error:', err);
            setGenerationMessage('❌ Failed to trigger thumbnail generation');
          } finally {
            setProcessing(false);
          }
        }
      }
    });

    return () => unsub();
  }, [id, processing]);

  if (loading || !liveFile) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>{t('LOADING_FILE')}</Typography>
      </Box>
    );
  }

  const uploadedAt = liveFile.createdAt?.seconds
    ? moment.unix(liveFile.createdAt.seconds).fromNow()
    : t('UNKNOWN_DATE');

  const sizeKb = liveFile.fileSize
    ? (liveFile.fileSize / 1024).toFixed(1)
    : '—';

  return (
    <Card sx={{ my: 0 }}>
      <CardHeader
        title={liveFile.fileName || t('UNKNOWN_FILENAME')}
        subheader={`${sizeKb} KB — ${uploadedAt}`}
      />

      {liveFile.thumbnailProcessing && (
        <LinearProgress sx={{ width: '100%', mb: 1 }} />
      )}

      <CardContent>
        {generationMessage && (
          <Alert
            severity={
              generationMessage.startsWith('✅') ? 'success' : 'error'
            }
            sx={{ mb: 2 }}
          >
            {generationMessage}
          </Alert>
        )}

        {liveFile.thumbnail ? (
          <>
            {!thumbnailLoaded && (
              <Skeleton
                variant="rectangular"
                height={340}
                width="100%"
                animation="wave"
              />
            )}
            <CardMedia
              component="img"
              height="340"
              image={liveFile.thumbnail}
              alt="PDF thumbnail"
              onLoad={() => setThumbnailLoaded(true)}
              onError={() => setThumbnailLoaded(true)}
              sx={{ display: thumbnailLoaded ? 'block' : 'none' }}
            />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
