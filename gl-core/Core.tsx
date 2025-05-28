'use client';
import * as React from 'react';
import { 
  usePathname, 
  useRouter, 
} from 'next/navigation';
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

export default function Core({ 
  frontmatter, 
  body = null
}: TCore) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const maxHeight = isMobile ? 155 : 315;
  const isApp =
    pathname.startsWith('/cv') || pathname.startsWith('/free/flickr');

  const isCV = pathname === '/cv';
  const isFlickr = pathname === '/free/flickr';
  
  let app = <></>;
  switch (true) {
    case pathname.startsWith('/cv'):
      app = <CV 
              mode="app"
              markdown={body}
            />;
      break;
    case pathname.startsWith('/free/flickr'):
      app = <Flickr 
              mode="app"
              id="72177720326317140"
            />;
      break;
    default:
      break;
  }

  const getAside = () => {
    return  <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Box 
                id="sidebar" 
                component="aside"
                sx={{
                  mr: 4,
                  ml: isMobile ? 4 : 0,
                }}
              >
                { !isCV && <Box sx={{ mb: 2 }}>
                              <CV mode="advert" />
                            </Box> }
                { !isFlickr && <Flickr
                  mode="album-card"
                  id="72177720326317140"
                  onClick={() => {
                    router.push(`/free/flickr`);
                  }}
                /> }
              </Box>
            </Grid>
  };

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
              <Box sx={{ mx: 4 }}>
                <Photo 
                  alt={frontmatter.title}
                  maxHeight={maxHeight} 
                  src={frontmatter?.image ?? null}

                />
              </Box>
              <Box sx={{ mt: isMobile ? 3 : 0 }}>
                { isMobile && getAside() }
              </Box>

              <Box sx={{ px: isMobile ? 0.5 : 2 }}>
                {pathname !== '/' && <PageBreadcrumb />}
                <Box sx={{ height: 24 }} />
                {isApp ? app : <RenderMarkdown>{body}</RenderMarkdown>}
              </Box>
            </Grid>
            
            { !isMobile && getAside() }
            
          </Grid>
        </MovieClip>
      </Flash>
    </Theme>
  );
}

/*

*/