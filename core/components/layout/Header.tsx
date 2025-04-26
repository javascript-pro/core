'use client';
import * as React from 'react';
import {
  useTheme,
  AppBar,
  CardHeader,
  Container,
  useMediaQuery,
} from '@mui/material';
import { HeaderNav, Icon } from '../../';

export interface IHeader {
  icon?: string | null;
  title?: string | null;
  description?: string | null;
}

export default function Header({
  icon = 'goldlabel',
  title = 'Default title',
  description = 'Default description',
}: IHeader) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: 0,
          bottom: 'auto',
          boxShadow: 0,
          background: theme.palette.background.default,
        }}
      >
        <Container maxWidth="md">
          <CardHeader
            avatar={<Icon icon={icon as any} />}
            title={title}
            subheader={description}
            action={<HeaderNav />}
          />
        </Container>
      </AppBar>
    </>
  );
}
