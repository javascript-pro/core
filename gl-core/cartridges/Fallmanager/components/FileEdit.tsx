'use client';
import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Button,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useFallmanagerSlice, useLingua } from '../../Fallmanager';

export default function FileEdit({ id }: { id: string }) {
  const t = useLingua();
  const { files } = useFallmanagerSlice();
  const router = useRouter();

  const file = files?.[id] || null;

  if (!file) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          {t('LOADING_FILE') || 'Datei wird geladen...'}
        </Typography>
      </Box>
    );
  }

  const uploadedAt = file.createdAt?.seconds
    ? new Date(file.createdAt.seconds * 1000).toLocaleString()
    : 'Unbekanntes Datum';

  const sizeKb = (file.fileSize / 1024).toFixed(1);

  return (
    <Card sx={{ my: 4 }}>
      <CardHeader
        title={file.fileName}
        subheader={`${sizeKb} KB — ${uploadedAt}`}
      />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Datei-ID: {file.id}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Download-Link:
          </Typography>
          <Typography
            component="a"
            href={file.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ wordBreak: 'break-all', color: 'primary.main' }}
          >
            {file.downloadUrl}
          </Typography>

          {/* Optional: back button */}
          <Box>
            <Button
              variant="outlined"
              onClick={() => router.push('/fallmanager')}
            >
              {t('BACK_TO_LIST') || 'Zurück zur Liste'}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
