'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { CssBaseline, Box, Grid } from '@mui/material';
import {
  Theme,
  Flash,
  MovieClip,
  Photo,
  RenderMarkdown,
  Header,
  PageBreadcrumb,
  useIsMobile,
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
  const isMobile = useIsMobile();

  // console.log("isMobile", isMobile);
  const maxHeight = isMobile ? 150 : 180;

  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">
        <MovieClip id="content" opacity={0}>
          <Header frontmatter={frontmatter} />
          

          <Box sx={{ height: 0 }} />

          <Grid container spacing={1}>
            <Grid size={{
              xs: 12,
              md: 5,
            }}>
              <Photo maxHeight={maxHeight} src={frontmatter?.image ?? null} />
            </Grid>
            <Grid size={{
              xs: 12,
              md: 7,
            }}>
              {pathname !== '/' ? <PageBreadcrumb /> : null}
              <RenderMarkdown>{body}</RenderMarkdown>
            </Grid>
          </Grid>
          
        </MovieClip>
      </Flash>
    </Theme>
  );
}
