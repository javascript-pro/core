'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Grid, ButtonBase } from '@mui/material';
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
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(
      collection(db, 'fallmanager'),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(data);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (doc: DocumentData) => {
    dispatch(setzeAktuellerFall(doc as any));
    router.push(`/fallmanager/${doc.id}`);
  };

  return (
    <Grid container spacing={1}>
      {docs.map((doc) => (
        <Grid
          key={doc.id}
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <ButtonBase
            onClick={() => handleClick(doc)}
            sx={{
              width: '100%',
              textAlign: 'left',
              display: 'block',
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<Icon icon="doc" color="disabled" />}
                title={doc.clientName || 'No client name'}
                // subheader={`id: ${doc.id}`}
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
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
}
