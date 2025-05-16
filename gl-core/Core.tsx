'use client';
import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { Theme, Flash, MovieClip, Photo,useSlice, RenderMarkdown, MainMenu } from '../gl-core';

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

export default function Core({ frontmatter = null, body = null }: TCore) {
  const slice = useSlice();
  const { flash } = slice;
  const { showOutput } = flash;
  // const showOutput = true
  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">
        <MovieClip id="rehydrate-ad" opacity={0}>
          <img src="/svg/rehydrate-ad.svg" />
        </MovieClip>

       

        <MovieClip id="body" opacity={0}>
          <Photo src={frontmatter?.image ?? null} />
          <RenderMarkdown>{body}</RenderMarkdown>
        </MovieClip>

         <MovieClip id="nav" opacity={0} >
          <MainMenu />
        </MovieClip>


        {showOutput ? (
          <MovieClip id="output">
            <pre>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre>
          </MovieClip>
        ) : null}

      </Flash>
    </Theme>
  );
}
