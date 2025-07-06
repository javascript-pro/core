'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  CardHeader,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import { Icon, useDispatch, routeTo } from '../../../../gl-core';
import {
  useLingua,
  TopRightMenu,
} from '../../Fallmanager';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const t = useLingua();
  const theme = useTheme();

  const handleAvatarClick = () => {
    if (pathname !== '/fallmanager') {
      dispatch(routeTo('/fallmanager', router));
    }
  };

  const title = `${t('APP_TITLE')}`;

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
          <IconButton color="primary" onClick={handleAvatarClick}>
            <Icon icon={"cases"} />
          </IconButton>
        }
        title={<Typography variant="h6">{title}</Typography>}
        action={<TopRightMenu />}
      />
    </AppBar>
  );
}
