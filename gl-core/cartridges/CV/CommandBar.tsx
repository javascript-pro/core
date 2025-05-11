'use client';
import React from 'react';
import { Box, Container, AppBar, Toolbar } from '@mui/material';
import { useSlice, MightyButton, useDispatch, useIsMobile } from '../../';
import { updateCVKey, resetCV } from "../CV";

export default function CommandBar() {
  const isMobile = useIsMobile()
  const dispatch = useDispatch();
  const slice = useSlice();
  const { mode } = slice.cv;

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
          {mode === "jd" || mode === "ai" ? 
            <MightyButton
              mode={isMobile ? "icon" : null}
              onClick={() => {
                dispatch(resetCV())
              }}
              icon="doc"
              label="Resume"
              variant="text"
            /> : null}
          
          {mode === "resume" || mode === "ai" ? <MightyButton
            mode={isMobile ? "icon" : null}
            onClick={() => {
              dispatch(updateCVKey('cv', { mode: "jd"}));
            }}
            icon="job"
            label="Job Description"
            variant="text"
          /> : null }
          

          <Box sx={{ flexGrow:1 }} />

          {mode === "jd" ? 
            <MightyButton
              onClick={() => {
                dispatch(updateCVKey('cv', { mode: "ai"}));
              }}
              label="Match CV"
              variant="contained"
              icon="openai"
            /> 
          : <MightyButton
              onClick={() => {
                
              }}
              label="Download"
              variant="contained"
              icon="download"
            /> }
          </Toolbar>
      </Container>
    </AppBar>
  );
}

/*
*/
