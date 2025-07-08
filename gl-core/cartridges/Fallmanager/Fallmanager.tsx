'use client';

import * as React from 'react';
import { CssBaseline, Grid, Container } from '@mui/material';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { Theme, useDispatch } from '../../../gl-core';
import {
  Header,
  useFallmanagerSlice,
  incomingCases,
  incomingFiles,
  FileEdit,
  Files,
} from '../Fallmanager';
import { db } from '../../lib/firebase';
import Upload from './components/Upload';

export default function Fallmanager() {
  const dispatch = useDispatch();
  const { theme } = useFallmanagerSlice();

  const pathname = usePathname();
  const segments = pathname?.split('/') || [];
  const isEditing = segments.includes('file') && segments.length > 3;
  const fileId = isEditing ? segments[segments.length - 1] : null;

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'fallmanager'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updates: Record<string, any> = {};
        snapshot.forEach((doc) => {
          updates[doc.id] = { id: doc.id, ...doc.data() };
        });
        dispatch(incomingCases(updates));
      },
      (error) => {
        console.error('❌ Firestore subscription error (cases):', error);
      },
    );
    return () => unsub();
  }, [dispatch]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'files'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updates: Record<string, any> = {};
        snapshot.forEach((doc) => {
          updates[doc.id] = { id: doc.id, ...doc.data() };
        });
        dispatch(incomingFiles(updates));
      },
      (error) => {
        console.error('❌ Firestore subscription error (files):', error);
      },
    );
    return () => unsub();
  }, [dispatch]);

  return (
    <Theme theme={theme}>
      <CssBaseline />
      <Container>
        <Header />
        {isEditing && fileId ? (
          <FileEdit id={fileId} />
        ) : (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Files />
            </Grid>
          </Grid>
        )}
      </Container>
    </Theme>
  );
}
