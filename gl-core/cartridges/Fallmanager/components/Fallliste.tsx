// core/gl-core/cartridges/Fallmanager/components/Fallliste.tsx
'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, ButtonBase } from '@mui/material';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useTranslation, setzeAktuellerFall } from '../../Fallmanager';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Fallliste() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const t = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'fallmanager'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocs(data);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleClick = (doc: DocumentData) => {
    dispatch(setzeAktuellerFall(doc as any));
    router.push(`/fallmanager/fall/${doc.id}`);
  };

  return (
    <Box sx={{ mx: 2 }}>
      {docs.map((doc) => (
        <ButtonBase
          key={doc.id}
          onClick={() => handleClick(doc)}
          sx={{ width: '100%', mb: 2, textAlign: 'left' }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 2,
              width: '100%',
              borderRadius: 1,
              bgcolor: '#f5f5f5',
              '&:hover': {
                bgcolor: '#e0e0e0',
              },
            }}
          >
            <Typography variant="h6">
              {doc.title || doc.name || `Fall ${doc.id}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doc.description || t('noDescription')}
            </Typography>
          </Paper>
        </ButtonBase>
      ))}
    </Box>
  );
}
