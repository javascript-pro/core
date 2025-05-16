'use client';
import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { Theme, Flash, MovieClip, useSlice, RenderMarkdown } from '../gl-core';

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
    frontmatter = null,
    body = null,
  }: TCore,
) {
  const slice = useSlice();
  const {flash} = slice
  const {showOutput} = flash;
  // const showOutput = true

  return (
    <Theme>
      <CssBaseline />
      <Flash id="flash-core" scene="core">
        
        <MovieClip id="flash-main" opacity={0} width={800}>
          <RenderMarkdown height="60vh">
            {body}
          </RenderMarkdown>
        </MovieClip>

        <MovieClip id="rehydrate-ad" opacity={0}>
          <img src="/svg/rehydrate-ad.svg" />
        </MovieClip>

        {showOutput ? <MovieClip id="output">
          <pre>
            body: {JSON.stringify(body, null, 2)}
          </pre>
        </MovieClip> : null }
        
      </Flash>
    </Theme>
  );
}
