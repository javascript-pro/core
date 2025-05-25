'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const isMobile = useIsMobile();
  const maxHeight = isMobile ? 150 : 180;

  return (
    <Theme>
      <CssBaseline />
      <Flash id="core">
        <MovieClip id="content" opacity={0}>
          <Header frontmatter={frontmatter} />

          <Grid container spacing={1}>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 8,
                lg: 9,
              }}
            >
              <Photo maxHeight={maxHeight} src={frontmatter?.image ?? null} />
              <Box
                sx={{
                  // border: "1px solid gold",
                  p: 2,
                }}
              >
                {pathname !== '/' && <PageBreadcrumb />}
                <RenderMarkdown>{body}</RenderMarkdown>
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 5,
                lg: 4,
              }}
            >
              <Box
                sx={{
                  mx: 2,
                }}
              >
                <Flickr
                  mode="album-card"
                  id="72177720326317140"
                  onClick={() => {
                    router.push(`/free/flickr`);
                    // router.push(`/balance/flickr/album/72177720326317140`)
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </MovieClip>
      </Flash>
    </Theme>
  );
}
