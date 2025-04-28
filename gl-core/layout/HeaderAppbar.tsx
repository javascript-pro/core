'use client';

import * as React from 'react';
import {
  AppBar,
  Container,
  CardHeader,
  IconButton,
} from '@mui/material';
import { Icon } from '../';

export type THeaderAppbar = {
  maxW?: "xs" | "sm" | "md" | "lg" | null
  title?: string | null;
  subheader?: string | null;
}

export default function HeaderAppbar({
  title = null,
  subheader = null,
  maxW = null
}: THeaderAppbar) {

  
  return <AppBar>
          <Container maxWidth={maxW as any}>
            <CardHeader 
              title={title}
              subheader={subheader}
              action={<IconButton
                        color="inherit"
                      >
                        <Icon icon="menu" />
                      </IconButton>}
            />
          </Container>
        </AppBar>
}
