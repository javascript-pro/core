'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  ButtonBase,
  Alert,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import {
  collection,
  onSnapshot,
  DocumentData,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Icon } from '../../../../gl-core';
import { useLingua, setzeAktuellerFall } from '../../Fallmanager';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Fallliste() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, 'fallmanager'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (doc: DocumentData) => {
    dispatch(setzeAktuellerFall(doc as any));
    router.push(`/fallmanager/${doc.id}`);
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : docs.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {t('NOT_FOUND')}
        </Alert>
      ) : (
        <List disablePadding>
          {docs.map((doc) => (
            <ListItem key={doc.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton onClick={() => handleClick(doc)}>
                <Card sx={{ width: '100%' }}>
                  <CardHeader
                    avatar={<Icon icon="doc" color="disabled" />}
                    title={doc.clientName || 'No client name'}
                    titleTypographyProps={{
                      noWrap: true,
                      sx: { overflow: 'hidden', textOverflow: 'ellipsis' },
                    }}
                    subheaderTypographyProps={{
                      noWrap: true,
                      sx: { overflow: 'hidden', textOverflow: 'ellipsis' },
                    }}
                  />
                </Card>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
