'use client';

import * as React from 'react';
import {
  AppBar,
  Container,
  CardHeader,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
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
  // icon = null,
}: THeader) {

  const isMobile = useIsMobile();
  const router = useRouter();
  
  return (
    <AppBar 
      color="default"
      position="fixed"
      sx={{
        boxShadow: 0,
        top: isMobile ? 'auto' : 0,
        bottom: isMobile ? 0 : 'auto',
      }}
    >
      <Container maxWidth={maxW as any}>
        <CardHeader 
          avatar={
            <IconButton
              onClick={() => {
                router.push("/");
              }}
              color="inherit"
            >
              <Icon icon={"home"} />
            </IconButton>
          }
          title={title}
          subheader={subheader}
          action={isMobile ? <Nav /> : null}
        />
      </Container>
    </AppBar>
  );
}
