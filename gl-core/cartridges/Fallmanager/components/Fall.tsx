// core/gl-core/cartridges/Fallmanager/components/Fall.tsx
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
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, DocumentData, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import {
  useLingua,
  setzeAktuellerFall,
  BearbeitbarText,
} from '../../Fallmanager';
import { useDispatch } from '../../../../gl-core';
import Datei from './Datei';

export default function Fall() {
  const { slug } = useParams() as { slug?: string[] };
  const id = slug?.[2];
  const [fallData, setFallData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const unsub = onSnapshot(doc(db, 'fallmanager', id), (snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        const data = { id: snapshot.id, ...snapshot.data() };
        setFallData(data);
      } else {
        setFallData(null);
      }
    });

    return () => unsub();
  }, [id]);

  const handleBackToList = () => {
    dispatch(setzeAktuellerFall(null));
    router.push('/fallmanager');
  };

  const handleTitleSave = async (newTitle: string) => {
    if (!fallData || !id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'fallmanager', id), {
        title: newTitle,
      });
    } catch (e) {
      console.error('Fehler beim Speichern des Titels:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Hochladen');
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message);
    } finally {
      setUploading(false);
      event.target.value = ''; // Reset input
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
            <Button
              color="secondary"
              variant="contained"
              onClick={handleBackToList}
            >
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
            <Grid
              size={{
                xs: 12,
                md: 8,
              }}
            >
              <BearbeitbarText
                value={fallData.title || ''}
                onSave={handleTitleSave}
                label={t('caseTitle')}
              />
            </Grid>

            {fallData.dateien?.length > 0 && (
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                {uploadError && (
                  <Box my={3}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {uploadError}
                    </Alert>
                  </Box>
                )}

                <Button
                  // fullWidth
                  color="secondary"
                  variant="outlined"
                  disabled={uploading}
                  sx={{ mb: 2 }}
                >
                  {uploading ? t('uploading') : t('newPDF')}
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={handleFileUpload}
                  />
                </Button>
                {fallData.dateien.map((file: any) => (
                  <Datei key={file.fileId} />
                ))}
              </Grid>
            )}
          </Grid>
        </CardContent>

        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={handleBackToList}>
            {t('saveClose')}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
