'use client';
import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { Theme, Flash, MovieClip, useSlice } from '../gl-core';

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

export default function Core(
  {
    // frontmatter = null,
    // body = null,
  }: TCore,
) {
  const slice = useSlice();
  const {flash} = slice
  const {showRedux} = flash;
  // console.log("slice", slice)

  return (
    <Theme>
      <CssBaseline />

      <Flash 
        id="flash-core"
        scene="core"
      >

        <MovieClip id="rehydrate-ad">
          <img src="/svg/rehydrate-ad.svg" />
        </MovieClip>

        {showRedux ? <MovieClip id="redux">
          <pre>flash: {JSON.stringify(flash, null, 2)}</pre>
        </MovieClip> : null }
        
      </Flash>
    </Theme>
  );
}
