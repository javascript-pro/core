'use client';

import * as React from 'react';
import { config } from './config';
import {
  CssBaseline,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { Theme, useDispatch, MightyButton, Icon } from '../../../gl-core';
import { useAdminSlice } from '../Admin';

export default function Admin() {
  const dispatch = useDispatch();
  const adminSlice = useAdminSlice();
  const currentTheme = config.themes.light;

  return (
    <Theme theme={currentTheme as any}>
      <CssBaseline />
      <Container>

        <Box sx={{my: 3}}>
          <MightyButton 
            sx={{mr:3}}
            label="Primary"
            variant="contained"
            icon="design"
            iconPlacement='right'
          />

          <MightyButton 
            label="Secondary"
            color="secondary"
            variant="contained"
            icon="design"
          />
        </Box>

        <Accordion>
          <AccordionSummary expandIcon={<Icon icon="up" color="primary" />}>
            <Typography>Uberedux</Typography>
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
