'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  CssBaseline,
  Container,
  Box,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import {
  Theme,
  RenderMarkdown,
  Header,
  PageBreadcrumb,
  useIsMobile,
  SideAds,
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

  const [imageError, setImageError] = React.useState(false);

  let app = <></>;
  switch (true) {
    case isCV:
      app = <CV mode="app" markdown={body} />;
      break;
    case isFlickr:
      app = <Flickr mode="app" id="72177720324245676" />;
      break;
    default:
      break;
  }

  const getAside = () => (
    <Grid
      size={{
        md: 3,
        lg: 2,
      }}
    >
      <SideAds />
    </Grid>
  );

  return (
    <Theme>
      <CssBaseline />
      <Container id="core">
        <Header frontmatter={frontmatter} />
        <Grid container spacing={1}>
          {!isMobile && getAside()}
          <Grid
            size={{
              md: 9,
              lg: 10,
            }}
          >
            <Box sx={{ mt: isMobile ? 2 : 0 }}>
              {frontmatter?.image && (
                <Box sx={{ mx: 4, mt: 0 }}>
                  {!imageError ? (
                    <Image
                      priority
                      src={frontmatter.image}
                      alt={frontmatter.title || 'Featured image'}
                      width={1200}
                      height={630}
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <Box>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={315}
                      />
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Image not found. "{frontmatter.image}"
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              <Box
                sx={{
                  px: isMobile ? 0.5 : 2,
                  mb: !isMobile ? 3 : 2,
                }}
              >
                {pathname !== '/' && <PageBreadcrumb />}
              </Box>
            </Box>

            <Box
              sx={{
                mb: '50px',
                px: isMobile ? 0.5 : 2,
              }}
            >
              {isApp ? app : <RenderMarkdown>{body}</RenderMarkdown>}
              {isMobile && getAside()}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Theme>
  );
}
