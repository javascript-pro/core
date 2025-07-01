// core/gl-core/cartridges/Fallmanager/components/Faelle.tsx
'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import {
  useFallmanagerSlice,
  Fallliste,
  Fall,
  useTranslation,
} from '../../Fallmanager';

export default function Faelle() {
  const { aktuellerFall } = useFallmanagerSlice();
  const t = useTranslation();

  return <Box>{aktuellerFall === null ? <Fallliste /> : <Fall />}</Box>;
}

/*
  <pre>{JSON.stringify(aktuellerFall, null, 2)}</pre>
*/
