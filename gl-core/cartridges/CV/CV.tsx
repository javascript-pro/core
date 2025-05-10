'use client';

import * as React from 'react';
import { Container, AppBar } from '@mui/material';
import { TailoredCV } from './';
import { MightyButton, useSlice } from '../../';

export type TCV = {
  originalCV?: string | null;
};
export default function CV({ originalCV = null }: TCV) {
  const slice = useSlice();
  const { cv } = slice;

  const onDownloadClick = () => {
    console.log('onDownloadClick');
  };

  React.useEffect(() => {}, []);

  if (cv?.resume) return null;

  return (
    <Container maxWidth="md">
      <TailoredCV markdown={originalCV} />
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          background: 0,
          boxShadow: 0,
          top: 'auto',
          bottom: 0,
          p: 1,
        }}
      >
        <Container maxWidth="md">
          <MightyButton
            fullWidth
            onClick={onDownloadClick}
            color="secondary"
            label="Download PDF"
            variant="contained"
            icon="download"
          />
        </Container>
      </AppBar>
    </Container>
  );
}
