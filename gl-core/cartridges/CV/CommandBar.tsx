'use client';
import React from 'react';
import { Box, Container, AppBar, Toolbar } from '@mui/material';
import { MightyButton, useDispatch } from '../../';
import { updateCVKey, resetCV } from "../CV";

export default function CommandBar() {
  const dispatch = useDispatch();

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

          <MightyButton
            onClick={() => {
              dispatch(resetCV())
            }}
            icon="doc"
            color="primary"
            label="Resume"
            variant="text"
          />

          <MightyButton
            onClick={() => {
              dispatch(updateCVKey('cv', { mode: "jd"}));
            }}
            icon="job"
            color="primary"
            label="Job Description"
            variant="text"
          />

          <Box sx={{ flexGrow:1 }} />
            <MightyButton
              onClick={() => {}}
              color="primary"
              label="Download"
              variant="contained"
              icon="download"
            />
          </Toolbar>
      </Container>
    </AppBar>
  );
}

/*
*/
