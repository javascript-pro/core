'use client';
import * as React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Theme, Responsive } from '../gl-core';

export type TFrontmatter = {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
};

export type TCore = {
  type?: 'page' | 'file' | 'folder' | 'cv';
  frontmatter?: TFrontmatter | null;
  body?: string | null;
  children?: React.ReactNode;
};

export default function Core({
  frontmatter = null,
  body = null,
}: TCore) {

  return (
    <Theme>
      <CssBaseline />
      <Box
        id="scroll-top"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Responsive 
          body={body as any} 
          frontmatter={frontmatter as any} 
        />
      </Box>
    </Theme>
  );
}
