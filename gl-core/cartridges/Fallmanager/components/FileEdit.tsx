// core/gl-core/cartridges/Fallmanager/components/FileEdit.tsx
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
          {t('LOADING_FILE')}
        </Typography>
      </Box>
    );
  }

  const uploadedAt = file.createdAt?.seconds
    ? new Date(file.createdAt.seconds * 1000).toLocaleString()
    : 'Unbekanntes Datum';

  const sizeKb = (file.fileSize / 1024).toFixed(1);

  return (
    <Card sx={{ my: 0 }}>
      <CardHeader
        title={file.fileName}
        // subheader={`${sizeKb} KB — ${uploadedAt}`}
      />
      <CardContent>
        <pre>{JSON.stringify(file, null, 2)}</pre>    
      </CardContent>
    </Card>
  );
}
