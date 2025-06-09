'use client';

import config from './config.json';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  CssBaseline,
  Container,
  Box,
  Grid,
  Card,
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
  useVersionCheck,
} from '../gl-core';
import { Flickr } from './cartridges/Flickr';
import { CV } from './cartridges/CV';
import { NewCartridge } from './cartridges/NewCartridge';
import { SignoutButton, useUser } from './cartridges/Bouncer';

export type TFrontmatter = {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
  [key: string]: any;
};

export type TCore = {
  frontmatter?: any;
  body?: string | null;
  children?: React.ReactNode;
};

export default function Core({ frontmatter, body = null }: TCore) {
  let fullScreen = false;
  const pathname = usePathname();
  const user = useUser();
  useVersionCheck(); // Version check runs on mount
  const isMobile = useIsMobile();

  const isCV = pathname === '/cv';
  const isFlickr = pathname === '/free/flickr';
  const isFallmanager = pathname === '/clients/fallmanager';
  const isNewCartridge = pathname === '/cartridges/new-cartridge';
  const isApp = isCV || isFlickr || isFallmanager || isNewCartridge;

  const [imageError, setImageError] = React.useState(false);

  let app = <></>;
  switch (true) {
    case isFallmanager:
      fullScreen = true;
      app = (
        <>
          <SignoutButton />
          <Card sx={{ p: 1 }}>
            import Fallmanager Cartridge from
            https://github.com/javascript-pro/fallmanager (private)
          </Card>
        </>
      );
      break;

    case isNewCartridge:
      // fullScreen = true;
      app = <NewCartridge />;
      break;

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
        md: 4,
        lg: 3,
      }}
    >
      <SideAds />
    </Grid>
  );

  if (fullScreen) return <>{app}</>;

  return (
    <Theme theme={config.themes.dark as any}>
      <CssBaseline />
      <Container id="core">
        <Header frontmatter={frontmatter} />
        <Grid container spacing={1}>
          <Grid
            size={{
              md: 8,
              lg: 9,
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
          {!isMobile && getAside()}
        </Grid>
      </Container>
    </Theme>
  );
}
