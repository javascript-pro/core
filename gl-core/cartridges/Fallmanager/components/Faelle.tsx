'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import {
  useFallmanagerSlice,
  Fallliste,
  Fall,
  useLingua,
} from '../../Fallmanager';

export default function Faelle() {
  const { aktuellerFall } = useFallmanagerSlice();
  const t = useLingua();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (aktuellerFall === null && pathname !== '/fallmanager') {
      router.replace('/fallmanager');
    }
  }, [aktuellerFall, pathname, router]);

  return <Box>{aktuellerFall === null ? <Fallliste /> : <Fall />}</Box>;
}
