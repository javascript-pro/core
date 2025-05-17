'use client';
import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { 
  Theme, 
  Flash, 
  MovieClip, 
  Photo,
  useSlice, 
  RenderMarkdown, 
  Header,
  PageBreadcrumb, 
} from '../gl-core';

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

  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">

        {showOutput ? (
          <MovieClip id="output">
            <pre>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre>
          </MovieClip>
        ) : null}

        <MovieClip id="ad" opacity={0}>
          <img src="/svg/rehydrate-ad.svg" />
        </MovieClip>

        <MovieClip id="content" opacity={0} width="95vw">
          <Header frontmatter={frontmatter} />
          <Photo src={frontmatter?.image ?? null} />
          <PageBreadcrumb />
          <RenderMarkdown>
            {body}
          </RenderMarkdown>
        </MovieClip>

      </Flash>
    </Theme>
  );
}
