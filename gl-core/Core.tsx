'use client';
import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { Theme, Flash, MovieClip } from '../gl-core';

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
  // frontmatter = null,
  // body = null,
}: TCore) {

  return (
    <Theme>
      <CssBaseline />
      
      <Flash id="core">

        <MovieClip id="rehydrate-ad">
          <img src="/svg/rehydrate-ad.svg" />
        </MovieClip>

        <MovieClip id="core-header">
          <pre>{JSON.stringify(null, null, 2)}</pre>
        </MovieClip>

      </Flash>
    </Theme>
  );
}
