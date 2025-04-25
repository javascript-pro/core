'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme, AppBar, CardHeader, Container } from '@mui/material';
import { HeaderNav } from '../../';

export interface IHeader {
  meta: {
    title?: string;
    description?: string;
  };
}

export default function Header({
  meta = {
    title: 'Default title',
    description: 'Default description',
  },
}: IHeader) {
  const router = useRouter();

  const onHomeClick = () => {
    router.push('/');
  };

  const theme = useTheme();
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
            title={meta.title}
            subheader={meta.description}
            action={<HeaderNav />}
          />
        </Container>
      </AppBar>
    </>
  );
}
