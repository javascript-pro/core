'use client';
import config from '../../config.json';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useTheme,
  IconButton,
  AppBar,
  Avatar,
  CardHeader,
  Container,
} from '@mui/material';
import { HeaderActions } from './';

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
            // avatar={
            //   <>
            //     <IconButton onClick={onHomeClick}>
            //       <Avatar src={config.favicon.dark} />
            //     </IconButton>
            //   </>
            // }
            // title={meta.title}
            // subheader={meta.description}
            action={<HeaderActions />}
          />
        </Container>
      </AppBar>
    </>
  );
}
