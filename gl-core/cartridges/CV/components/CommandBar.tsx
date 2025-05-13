'use client';
import React from 'react';
import { Box, Container, AppBar, Toolbar } from '@mui/material';
import { useSlice, MightyButton, useDispatch, useIsMobile } from '../../../';
import { updateCVKey, resetCV, Download } from '../../CV';

export default function CommandBar() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const slice = useSlice();
  const { mode, jd, validJd, fit } = slice.cv;

  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={{
        top: 'auto',
        bottom: 0,
        p: 1,
      }}
    >
      <Container maxWidth="md">
        <Toolbar>
          {mode === 'jd' || mode === 'ai' ? (
            <MightyButton
              mode={isMobile ? 'icon' : null}
              onClick={() => {
                dispatch(updateCVKey('cv', { mode: 'resume' }));
              }}
              icon="preview"
              label="C.V."
              variant="text"
            />
          ) : null}

          {mode === 'resume' || mode === 'ai' ? (
            <>
              <MightyButton
                mode={isMobile ? 'icon' : null}
                onClick={() => {
                  dispatch(updateCVKey('cv', { mode: 'jd' }));
                }}
                icon="job"
                label="Job Description"
                variant="text"
              />
            </>
          ) : null}

          <Box sx={{ flexGrow: 1 }} />

          {mode === 'jd' ? (
            <MightyButton
              disabled={!validJd}
              onClick={() => {
                dispatch(updateCVKey('cv', { mode: 'ai' }));
              }}
              label="Match CV"
              variant="contained"
              icon="openai"
            />
          ) : (
            <Download />
          )}

          {jd ? (
            <MightyButton
              mode={'icon'}
              onClick={() => {
                dispatch(resetCV());
              }}
              icon="reset"
              label="Reset"
              variant="text"
            />
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
