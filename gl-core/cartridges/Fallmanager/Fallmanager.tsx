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

export default function Fallmanager() {
  const dispatch = useDispatch();
  const { themeMode, themes, files } = useFallmanagerSlice();

  const pathname = usePathname();
  const segments = pathname?.split('/') || [];
  const isEditing = segments.includes('file') && segments.length > 3;
  const fileId = isEditing ? segments[segments.length - 1] : null;

  // 🔁 Always subscribe to case updates on mount
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

  // 🔁 Always subscribe to file updates on mount — ensures files reload after Redux resets
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

  // 🎨 Pick the correct theme based on themeMode
  const currentTheme = themes?.[themeMode] || themes.light;

  return (
    <Theme theme={currentTheme}>
      <CssBaseline />
      <Container maxWidth="md">
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
        {/* <pre>{JSON.stringify(files, null, 2)}</pre> */}
      </Container>
    </Theme>
  );
}
