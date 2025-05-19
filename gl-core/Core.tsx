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
  Nav,
  NextPrevious,
} from '../gl-core';

// import { TestClip } from './cartridges/Flash';

export type TFrontmatter = {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
};

export type TCore = {
  type?: 'page' | 'file' | 'folder' | 'cv';
  frontmatter?: any;
  body?: string | null;
  children?: React.ReactNode;
};

// TestClip

export default function Core({ frontmatter, body = null }: TCore) {
  const slice = useSlice();
  const { flash } = slice;
  const { showOutput } = flash;
  // const showOutput = true;

  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">
        {showOutput ? (
          <MovieClip id="output">
            <pre>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre>
          </MovieClip>
        ) : null}

        <MovieClip id="content" opacity={0}>
          <Header frontmatter={frontmatter} />
          <Photo src={frontmatter?.image ?? null} />
          <PageBreadcrumb />
          {/* Conditionally control the size of this component */}
          <RenderMarkdown height={270}>{body}</RenderMarkdown>
        </MovieClip>

        <MovieClip id="nextprev" opacity={0} height={75}>
          <NextPrevious />
        </MovieClip>

        <MovieClip width={65} height={65} id="click-here" opacity={0}>
          <Nav />
        </MovieClip>
      </Flash>
    </Theme>
  );
}
