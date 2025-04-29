'use client';

import * as React from 'react';
import {
  AppBar,
  Container,
  CardHeader,
  IconButton,
} from '@mui/material';
import { useIsMobile, Icon, Nav } from '../';

export type THeader = {
  maxW?: "xs" | "sm" | "md" | "lg" | null
  title?: string | null;
  subheader?: string | null;
  icon?: string | null;
}

export default function Header({
  title = null,
  subheader = null,
  maxW = null,
  icon = null,
}: THeader) {

  const isMobile = useIsMobile();
  
  return <AppBar color={"secondary"} sx={{boxShadow: 0}}>
          <Container maxWidth={maxW as any}>
            <CardHeader 
              avatar={<IconButton
                        disabled
                        color="inherit"
                        >
                          <Icon icon={icon as any} />
                        </IconButton>}
              title={title}
              subheader={!isMobile ? subheader : null }
              action={<Nav />}
            />
          </Container>
        </AppBar>
}
