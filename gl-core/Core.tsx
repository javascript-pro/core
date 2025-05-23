'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { CssBaseline, Box } from '@mui/material';
import {
  Theme,
  Flash,
  MovieClip,
  Photo,
  RenderMarkdown,
  Header,
  PageBreadcrumb,
  NextPrevious,
} from '../gl-core';
import { Flickr } from './cartridges/Flickr';

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
  const pathname = usePathname();
  const showFlickr = pathname.includes('balance/flickr');

  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">
        <MovieClip id="content" opacity={0}>
          <Header frontmatter={frontmatter} />
          <PageBreadcrumb />
          <Box sx={{ height: 8 }}/>
          {showFlickr ? (
            <Flickr frontmatter={frontmatter} />
          ) : (
            <>
              <Photo src={frontmatter?.image ?? null} />
            </>
          )}
          <Box sx={{ height: 32 }}/>
          <RenderMarkdown>{body}</RenderMarkdown>
        </MovieClip>
      </Flash>
    </Theme>
  );
}
