'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CssBaseline, Box, Grid } from '@mui/material';
import {
  Theme,
  Flash,
  MovieClip,
  RenderMarkdown,
  Header,
  PageBreadcrumb,
  useIsMobile,
} from '../gl-core';
import { Flickr } from './cartridges/Flickr';
import { CV } from './cartridges/CV';

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

  const isCV = pathname === '/cv';
  const isFlickr = pathname === '/free/flickr';
  const isApp = isCV || isFlickr;

  let app = <></>;
  switch (true) {
    case isCV:
      app = <CV mode="app" markdown={body} />;
      break;
    case isFlickr:
      app = <Flickr mode="app" id="72177720326317140" />;
      break;
    default:
      break;
  }

  const getAside = () => (
    <Grid
      size={{
        xs: 12,
        md: 5,
        lg: 4,
      }}
    >
      <Box
        id="sidebar"
        component="aside"
        sx={{
          mr: isMobile ? 4.5 : 4,
          ml: isMobile ? 4.5 : 0,
        }}
      >
        {!isCV && (
          <Box sx={{ mb: 2 }}>
            <CV mode="advert" />
          </Box>
        )}
        {!isFlickr && (
          <Flickr
            mode="album-card"
            id="72177720326317140"
            onClick={() => {
              router.push(`/free/flickr`);
            }}
          />
        )}
      </Box>
    </Grid>
  );

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
                md: 7,
                lg: 8,
              }}
            >
              <Box
                sx={{
                  px: isMobile ? 0.5 : 2,
                  mt: !isMobile ? 3 : 2,
                }}
              >
                {pathname !== '/' && <PageBreadcrumb />}
              </Box>

              <Box sx={{ mt: isMobile ? 2 : 0 }}>{isMobile && getAside()}</Box>

              <Box
                sx={{
                  px: isMobile ? 0.5 : 2,
                }}
              >
                <Box sx={{ mt: isMobile ? 2 : 1 }} />
                {isApp ? app : <RenderMarkdown>{body}</RenderMarkdown>}
              </Box>
            </Grid>
            {!isMobile && getAside()}
          </Grid>
        </MovieClip>
      </Flash>
    </Theme>
  );
}
