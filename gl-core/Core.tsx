// core/gl-core/Core.tsx
'use client';

import config from './config.json';
import { TCore } from './types';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CssBaseline, Box, Grid, Skeleton, Typography } from '@mui/material';
import {
  ArrowMenu,
  Theme,
  RenderMarkdown,
  Header,
  PageBreadcrumb,
  useIsMobile,
  useVersionCheck,
  IncludeAll,
  useThemeMode,
  toggleLoading,
  useDispatch,
} from '../gl-core';
import { SideAds } from '../gl-core';
import { FlickrLatest } from './cartridges/Flickr';
import { CV } from './cartridges/CV';
import { Bouncer } from './cartridges/Bouncer';
import { Fallmanager } from './cartridges/Fallmanager';

export default function Core({ frontmatter, body = null }: TCore) {
  let fullScreen = false;
  const pathname = usePathname();
  const router = useRouter();
  const themeMode = useThemeMode();
  useVersionCheck();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  // Redirects
  React.useEffect(() => {
    if (pathname === '/cv') {
      router.replace('/work/cv');
    }
    if (pathname === '/free/flickr') {
      router.replace('/work/core/cartridges/flickr');
    }
  }, [pathname, router]);

  // Reset loading on mount
  React.useEffect(() => {
    dispatch(toggleLoading(false));
  }, [dispatch]);

  const isCV = pathname === '/work/cv';
  const isFallmanager = pathname.startsWith('/fallmanager');
  const isApp = isCV || isFallmanager;

  const [imageError, setImageError] = React.useState(false);

  let app = <></>;
  switch (true) {
    case isFallmanager:
      fullScreen = true;
      app = (
        <Bouncer>
          <IncludeAll />
          <Fallmanager />
        </Bouncer>
      );
      break;
    case isCV:
      app = <CV mode="app" markdown={body} />;
      break;
    default:
      break;
  }

  if (fullScreen) return <>{app}</>;

  return (
    <Theme theme={config.themes[themeMode] as any}>
      <CssBaseline />
      <IncludeAll />
      <Box id="core">
        <Box sx={{ minHeight: '100vh' }}>
          <Header frontmatter={frontmatter} />
          <Grid container spacing={1}>
            {/* LEFT COLUMN — SideAds (desktop only) */}
            {!isMobile && (
              <Grid size={{ md: 2, lg: 2 }}>
                <SideAds />
              </Grid>
            )}

            {/* MIDDLE COLUMN — Main content */}
            <Grid size={{ xs: 12, md: 8, lg: 7 }}>
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
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                        >
                          "{frontmatter.image}" not found.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}

                <Box sx={{ px: isMobile ? 0.5 : 2, my: !isMobile ? 3 : 2 }}>
                  {pathname !== '/' && <PageBreadcrumb />}
                </Box>
              </Box>

              <Box sx={{ mb: '175px', px: isMobile ? 0.5 : 2 }}>
                {isApp ? app : <RenderMarkdown>{body}</RenderMarkdown>}
                <ArrowMenu />
              </Box>
            </Grid>

            {/* RIGHT COLUMN — FlickrLatest (desktop only) */}
            {!isMobile && (
              <Grid size={{ md: 2, lg: 3 }}>
                <FlickrLatest />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Theme>
  );
}
