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
import { usePathname, useRouter } from 'next/navigation';
import {
  doc,
  onSnapshot,
  DocumentData,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useLingua, BearbeitbarText, deleteCase } from '../../Fallmanager';
import { useDispatch } from '../../../../gl-core';

export default function Fall() {
  const pathname = usePathname();
  const id = pathname.split('/fallmanager/')[1];
  const router = useRouter();
  const t = useLingua();
  const dispatch = useDispatch();

  const [fallData, setFallData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleDelete = async () => {
    if (!id) return;
    const confirm = window.confirm(t('DELETE_CONFIRM'));
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
              {t('BACK')}
            </Button>
          }
        >
          {t('NOT_FOUND')}
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

            <Grid size={{ xs: 12, md: 4 }}>Grid Right</Grid>
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
