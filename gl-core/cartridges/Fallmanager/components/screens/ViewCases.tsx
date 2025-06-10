'use client';
import * as React from 'react';
import { Box, Typography, Button, Toolbar } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { fallmanagerCollection } from '../../../../firebase';

import { useDispatch, MightyButton, navigateTo } from '../../../../../gl-core';

export default function ViewCases() {
  const [cases, setCases] = React.useState<any[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(fallmanagerCollection, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCases(items);
    });

    return () => unsubscribe(); // clean up on unmount
  }, []);

  const handleNewClick = () => {
    dispatch(navigateTo('/fallmanager/cases/new'));
  };

  return (
    <Box sx={{ p: 1 }}>
      <MightyButton
        sx={{ mb: 2 }}
        variant="contained"
        color="secondary"
        onClick={handleNewClick}
        label="New Case"
        icon="plus"
      />

      <Typography variant="h6" gutterBottom>
        Viewing {cases.length} cases
      </Typography>
      <ul>
        {cases.map((fall) => (
          <li key={fall.id}>{fall.title ?? 'Kein Titel'}</li>
        ))}
      </ul>
    </Box>
  );
}
