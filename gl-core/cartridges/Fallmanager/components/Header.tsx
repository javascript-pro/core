// core/gl-core/cartridges/Fallmanager/components/Header.tsx
'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Button,
  CardHeader,
  Box,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import { Icon, useDispatch, routeTo } from '../../../../gl-core';
import { Sprachauswahl, useLingua, toggleNewCase } from '../../Fallmanager';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const t = useLingua();
  const theme = useTheme();

  const handleNewCase = () => {
    dispatch(toggleNewCase(true));
  };

  const handleAvatarClick = () => {
    if (pathname !== '/fallmanager') {
      dispatch(routeTo('/fallmanager', router));
    }
  };

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
            <Icon icon="cases" color="secondary" />
          </IconButton>
        }
        title={<Typography variant="h6">{t('APP_TITLE')}</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ pt: 0.5, pr: 1 }}>
              <Sprachauswahl />
            </Box>
            <Box>
              <Button
                onClick={handleNewCase}
                sx={{ mr: 1 }}
                color="secondary"
                variant="contained"
              >
                {t('NEW_CASE')}
              </Button>
            </Box>
          </Box>
        }
      />
    </AppBar>
  );
}
