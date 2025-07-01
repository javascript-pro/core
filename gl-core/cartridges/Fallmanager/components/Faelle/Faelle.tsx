// core/gl-core/cartridges/Fallmanager/components/Faelle/Faelle.tsx
'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import {
  useFallmanagerSlice,
  Fallliste,
} from '../../../Fallmanager';

export default function Faelle() {
  const { aktuellerFall } = useFallmanagerSlice();

  return (
    <Box>
      {aktuellerFall === null ? (
        <Fallliste />
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Fall bearbeiten
          </Typography>
          {/* Replace the content below with your actual editing UI */}
          <pre>{JSON.stringify(aktuellerFall, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}
