// core/gl-core/cartridges/Fallmanager/components/Header.tsx
'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Button,
  CardHeader,
  IconButton,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { Sprachauswahl, zuruecksetzen, useLingua, toggleNewCase } from '../../Fallmanager';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const t = useLingua();
  const theme = useTheme();

  const handleHome = () => {
    dispatch(zuruecksetzen());
  };

  const handleNewCase = () => {
    dispatch(toggleNewCase(true));
  };

  const title = t('APP_TITLE');

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
        title={<Typography variant="h6">{title}</Typography>}
        avatar={
          <IconButton onClick={handleHome} size="small">
            <Icon icon="home" />
          </IconButton>
        }
        action={
          <Box sx={{ display: 'flex' }}>
            <Box>
              <Button onClick={handleNewCase} sx={{ mr: 1 }} variant="contained">
                {t('NEW_CASE')}
              </Button>
            </Box>
            <Box sx={{ pt: 0.5 }}>
              <Sprachauswahl />
            </Box>
          </Box>
        }
      />
    </AppBar>
  );
}
