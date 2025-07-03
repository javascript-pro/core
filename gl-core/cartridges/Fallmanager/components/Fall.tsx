'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Alert,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Grid,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import {
  doc,
  onSnapshot,
  DocumentData,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useLingua, BearbeitbarText } from '../../Fallmanager';
import Datei from './Datei';
import { useDispatch } from '../../../../gl-core';
import { deleteCase } from '../actions/deleteCase';

export default function Fall() {
  const pathname = usePathname();
  const id = pathname.split('/fallmanager/')[1];
  const router = useRouter();
  const t = useLingua();
  const dispatch = useDispatch();

  const [fallData, setFallData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const unsub = onSnapshot(doc(db, 'fallmanager', id), (snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        setFallData({ id: snapshot.id, ...snapshot.data() });
      } else {
        setFallData(null);
      }
    });

    return () => unsub();
  }, [id]);

  const handleBack = () => {
    router.push('/fallmanager');
  };

  const handleClientNameSave = async (clientName: string) => {
    if (!fallData || !id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'fallmanager', id), {
        clientName,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('error', err);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !id) return;

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fallId', id);

    try {
      const res = await fetch('/api/gl-api/fallmanager/hochladen', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload failed');

      await updateDoc(doc(db, 'fallmanager', id), {
        updatedAt: serverTimestamp(),
      });
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirm = window.confirm(t('DELETE_CONFIRM') || 'Wirklich löschen?');
    if (!confirm) return;

    const success = await dispatch(deleteCase(id));
    if (success) {
      router.push('/fallmanager');
    }
  };

  if (loading) {
    return (
      <Box sx={{ mx: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (!fallData) {
    return (
      <Box sx={{ mx: 2 }}>
        <Alert
          severity="info"
          action={
            <Button variant="contained" onClick={handleBack}>
              {t('back')}
            </Button>
          }
        >
          {t('notFound')}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: 2 }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <BearbeitbarText
                value={fallData.clientName || ''}
                onSave={handleClientNameSave}
                label={t('CLIENT_NAME')}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              {uploadError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {uploadError}
                </Alert>
              )}

              {fallData.dateien?.map((file: any) => (
                <Datei key={file.fileId} />
              ))}
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={handleBack}>
            {t('CANCEL')}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('DELETE')}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
