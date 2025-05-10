'use client';

import * as React from 'react';
import { Container, AppBar } from '@mui/material';
import { useSlice, useDispatch } from '../../';
import { RenderCV, Job, Download, updateCVKey } from '../CV';

export type TCV = {
  originalCV?: string | null;
};

export default function CV({ 
  originalCV = null,
}: TCV) {

  const dispatch = useDispatch();
  const slice = useSlice();
  const { cv } = slice;

  React.useEffect(() => {
    const resume = cv?.resume;
    if (!resume && originalCV) {
      dispatch(updateCVKey('cv', { resume: originalCV}));
    }

  }, [cv?.resume, originalCV, dispatch]);

  if (!cv?.resume) return null;

  return (
    <Container maxWidth="md">
      <pre>cv: {JSON.stringify(cv, null, 2)}</pre>
      <Job />
      <RenderCV />
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
          <Download />
        </Container>
      </AppBar>
    </Container>
  );
}
