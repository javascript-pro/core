'use client';

import * as React from 'react';
import { Container, Collapse } from '@mui/material';
import { useSlice, useDispatch } from '../../';
import { AIResponse, JD, Resume, updateCVKey, CommandBar } from '../CV';

export type TCV = {
  originalCV?: string | null;
};

export default function CV({ originalCV = null }: TCV) {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { mode } = slice.cv;

  React.useEffect(() => {
    const resume = slice.cv.resume;
    if (!resume && originalCV) {
      dispatch(updateCVKey('cv', { resume: originalCV }));
    }
  }, [slice.cv.resume, originalCV, dispatch]);

  return (
    <Container maxWidth="md">
      {/* <pre>slice.cv: {JSON.stringify(slice.cv, null, 2)}</pre> */}
      <Collapse
        in={mode === 'resume' ? true : false}
        timeout="auto"
        unmountOnExit
      >
        <Resume />
      </Collapse>

      <Collapse in={mode === 'jd' ? true : false} timeout="auto" unmountOnExit>
        <JD />
      </Collapse>

      {mode === 'ai' ? <AIResponse /> : null}

      <CommandBar />
    </Container>
  );
}
