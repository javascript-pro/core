'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Alert,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  LinearProgress,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, DocumentData, updateDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useTranslation, setzeAktuellerFall, BearbeitbarText } from '../../../Fallmanager';
import { useDispatch } from 'react-redux';

export default function Fall() {
  const { slug } = useParams() as { slug?: string[] };
  const id = slug?.[2];
  const [fallData, setFallData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const t = useTranslation();
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
        <CardHeader
          title={
            <BearbeitbarText
              value={fallData.title || ''}
              onSave={handleTitleSave}
              label={t('title')}
            />
          }
        />
        <CardContent>
          {/* Additional editable fields go here */}
        </CardContent>
        <CardActions>
          <Button variant="text" onClick={handleBackToList}>
            {t('closeCase')}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
