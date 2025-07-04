'use client';

import * as React from 'react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  CardHeader,
  Box,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import { Icon, useDispatch, routeTo, MightyButton } from '../../../../gl-core';
import {
  useFallmanagerSlice,
  Sprachauswahl,
  useLingua,
  resetFallmanager,
} from '../../Fallmanager';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Header() {
  const slice = useFallmanagerSlice();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const t = useLingua();
  const theme = useTheme();

  const [clientName, setClientName] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<any>(null);

  // Detect caseId from path
  const pathParts = pathname.split('/');
  const isCasePage = pathParts.length === 3 && pathParts[1] === 'fallmanager';
  const caseId = isCasePage ? pathParts[2] : null;

  useEffect(() => {
    if (!caseId) {
      setClientName(null);
      setCreatedAt(null);
      return;
    }

    const unsub = onSnapshot(doc(db, 'fallmanager', caseId), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setClientName(data?.clientName || '(no name)');
        setCreatedAt(data?.createdAt || null);
      } else {
        setClientName('(not found)');
        setCreatedAt(null);
      }
    });

    return () => unsub();
  }, [caseId]);

  const handleAvatarClick = () => {
    if (pathname !== '/fallmanager') {
      dispatch(routeTo('/fallmanager', router));
    }
  };

  const handleReset = () => {
    dispatch(resetFallmanager());
  };

  const title =
    isCasePage && clientName ? `${clientName}` : `${t('APP_TITLE')}`;
  const subheader =
    isCasePage && createdAt ? `Created ${moment(createdAt).fromNow()}` : '';

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        boxShadow: 0,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CardHeader
        avatar={
          <IconButton onClick={handleAvatarClick}>
            <Icon icon={isCasePage ? 'case' : 'cases'} />
          </IconButton>
        }
        title={<Typography variant="h6">{title}</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mt: 0.5 }}>
              <MightyButton
                icon="reset"
                variant="text"
                onClick={handleReset}
                label={t('RESET')}
              />
            </Box>

            <Box sx={{ pt: 0.5, pr: 1 }}>
              <Sprachauswahl />
            </Box>
          </Box>
        }
      />
    </AppBar>
  );
}
