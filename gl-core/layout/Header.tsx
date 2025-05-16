'use client';

import * as React from 'react';
import { 
  AppBar,
  Button,
  Toolbar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useIsMobile, Icon, Nav } from '../';

export type THeader = {
  maxW?: 'xs' | 'sm' | 'md' | 'lg' | null;
  title?: string | null;
  subheader?: string | null;
  icon?: string | null;
};

export default function Header({
  title = null,
  subheader = null,
  maxW = null,
  // icon = null,
}: THeader) {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button 
          variant="contained"
        >
          Home
        </Button>
      </Toolbar>

    </AppBar>
  );
}
