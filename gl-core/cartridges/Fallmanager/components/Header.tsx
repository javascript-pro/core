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
} from '@mui/material';
import { useDispatch } from '../../../../gl-core';
import { Sprachauswahl, useLingua, toggleNewCase } from '../../Fallmanager';

export default function Header() {
  const dispatch = useDispatch();
  const t = useLingua();
  const theme = useTheme();

  const handleNewCase = () => {
    dispatch(toggleNewCase(true));
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
