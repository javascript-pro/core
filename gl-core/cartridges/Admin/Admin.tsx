'use client';

import * as React from 'react';
import { config } from './config';
import {
  CssBaseline,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { Theme, useDispatch, MightyButton, Icon } from '../../../gl-core';
import { useAdminSlice, Layout } from '../Admin';

export default function Admin() {
  const dispatch = useDispatch();
  const adminSlice = useAdminSlice();
  const currentTheme = config.themes.light;

  return (
    <Theme theme={currentTheme as any}>
      <CssBaseline />

      <Layout>
        <Card>
          <CardHeader title="Admin" avatar={<Icon icon="admin" />} />
          <CardContent>
            <Typography sx={{ my: 1 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              nulla leo, aliquam vitae vehicula non, consequat imperdiet mauris.
              Pellentesque non aliquet magna. Maecenas ut mattis mi. Mauris
              bibendum felis vitae venenatis luctus. Donec vulputate sem vel
              diam dignissim venenatis. Sed interdum ligula sed odio ornare
              accumsan. Sed condimentum nec risus et molestie. Pellentesque
              maximus ultricies dictum. Vestibulum porta pharetra lacus, non
              scelerisque nisl semper ac. In quis fringilla orci. Vestibulum et
              aliquet mauris, at porta ante. Maecenas tincidunt dignissim
              turpis, quis vehicula lectus ullamcorper ut. Curabitur iaculis
              ornare Aliquam non sem ac tortor condimentum dictum. Nunc posuere
              fringilla massa ac ornare. Duis pretium metus non facilisis
              aliquet. Nullam nec tellus augue. Quisque fringilla ante libero,
              et ultricies ipsum scelerisque vel. Nam mi lacus, interdum in urna
              quis, volutpat pretium purus. Morbi eu purus tempor lectus
              ultricies cursus. Mauris sollicitudin bibendum lorem, id tincidunt
              urna ultrices sed. Pellentesque ultricies pretium consequat.
              Maecenas ut diam at enim placerat faucibus id sed ex. Integer non
              felis augue. Sed leo lorem, facilisis ut dictum eget, ultricies id
              magna.
            </Typography>
          </CardContent>
          <CardActions>
            <MightyButton
              sx={{ mr: 1 }}
              label="Primary"
              variant="contained"
              icon="right"
              iconPlacement="right"
            />
            <MightyButton
              label="Secondary"
              color="secondary"
              variant="contained"
              icon="left"
            />
          </CardActions>
        </Card>
      </Layout>
    </Theme>
  );
}
