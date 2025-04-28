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
  icon?: string | null;
}

export default function HeaderAppbar({
  title = null,
  subheader = null,
  maxW = null,
  icon = null,
}: THeaderAppbar) {

  
  return <AppBar color={"secondary"} sx={{boxShadow: 0}}>
          <Container maxWidth={maxW as any}>
            <CardHeader 
              avatar={<IconButton
                        color="inherit"
                        >
                          <Icon icon={icon as any} />
                        </IconButton>}
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
