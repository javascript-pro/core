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
import { Icon, useDispatch, routeTo } from '../../../../gl-core';
import {
  useFallmanagerSlice,
  Sprachauswahl,
  useLingua,
  toggleNewCase,
  resetTranslations,
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
    dispatch(resetTranslations());
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
          <IconButton
            onClick={handleAvatarClick}
            disabled={pathname === '/fallmanager'}
          >
            <Icon icon={isCasePage ? 'case' : 'cases'} color="secondary" />
          </IconButton>
        }
        title={<Typography variant="h6">{title}</Typography>}
        subheader={
          subheader ? (
            <Typography variant="body2" color="text.secondary">
              {subheader}
            </Typography>
          ) : null
        }
        action={
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ pt: 0.5, pr: 1 }}>
              <Sprachauswahl />
            </Box>
            <Box sx={{ mt: 0.5 }}>
              <IconButton
                color="secondary"
                onClick={handleReset}
                title={t('RESET')}
              >
                <Icon icon="reset" />
              </IconButton>
            </Box>
          </Box>
        }
      />
    </AppBar>
  );
}
