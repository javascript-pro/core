'use client';
import React from 'react';
import { Box, Container, AppBar, Toolbar } from '@mui/material';
import { useSlice, MightyButton, useDispatch, useIsMobile } from '../../../';
import { updateCVKey, resetCV, Download } from '../../CV';

export default function CommandBar() {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const slice = useSlice();
  const { mode, jd } = slice.cv;

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

          { jd ? <MightyButton
            mode={isMobile ? 'icon' : null}
            onClick={() => {
              dispatch(resetCV());
            }}
            icon="reset"
            label="Reset"
            variant="text"
          /> : null }
          

          {mode === 'jd' || mode === 'ai' ? (
            <MightyButton
              mode={isMobile ? 'icon' : null}
              onClick={() => {
                dispatch(updateCVKey('cv', { mode: 'resume' }));
              }}
              icon="preview"
              label="Preview Resume"
              variant="text"
            />
          ) : null}

          {mode === 'resume' || mode === 'ai' ? (
            <MightyButton
              mode={isMobile ? 'icon' : null}
              onClick={() => {
                dispatch(updateCVKey('cv', { mode: 'jd' }));
              }}
              icon="add"
              label="Add Job Description"
              variant="text"
            />
          ) : null}

          <Box sx={{ flexGrow: 1 }} />

          {mode === 'jd' ? (
            <MightyButton
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
