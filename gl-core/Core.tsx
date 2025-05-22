'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
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
  Status,
} from '../gl-core';
import { Flickr } from './cartridges/Flickr'; // Adjust path if needed

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

export default function Core({ frontmatter, body = null }: TCore) {
  const slice = useSlice();
  const { flash } = slice;
  const { showOutput } = flash;
  const pathname = usePathname();
  const showFlickr = pathname.includes('balance/flickr');

  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">
        
        <MovieClip id="status" opacity={1}>
          <Status />
        </MovieClip>

        <MovieClip id="content" opacity={0}>
          {showFlickr ? 
            <Flickr frontmatter={frontmatter} />
          : (
            <>
              <Header frontmatter={frontmatter} />
              <Status />
              <Photo src={frontmatter?.image ?? null} />
              <PageBreadcrumb />
              <RenderMarkdown>{body}</RenderMarkdown>
            </>
          )}
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
