'use client';

import * as React from 'react';
import { config } from './config';
import {
  CssBaseline,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Theme, useDispatch, useSlice } from '../../../gl-core';
import { useAdminSlice } from '../Admin';

export default function Admin() {
  const dispatch = useDispatch();
  const adminSlice = useAdminSlice();
  const currentTheme = config.themes.light;

  return (
    <Theme theme={currentTheme as any}>
      <CssBaseline />
      <Container>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Admin Slice State</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(adminSlice, null, 2)}
            </pre>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Theme>
  );
}
