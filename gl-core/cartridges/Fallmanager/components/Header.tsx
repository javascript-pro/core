// core/gl-core/cartridges/Fallmanager/components/Header.tsx
'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  CardHeader,
  IconButton,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { Sprachauswahl, zuruecksetzen, useTranslation } from '../../Fallmanager';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const t = useTranslation();
  const theme = useTheme();

  const handleHome = () => {
    dispatch(zuruecksetzen());
  };

  const title = pathname === '/fallmanager' ? t('caseList') : t('caseEdit');

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
        title={
          <Typography variant="h6">
            {title}
          </Typography>
        }
        avatar={
          <IconButton onClick={handleHome} size="small">
            <Icon icon="home" />
          </IconButton>
        }
        action={<Sprachauswahl />}
      />
    </AppBar>
  );
}
