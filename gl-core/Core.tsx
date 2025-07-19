// /Users/goldlabel/GitHub/core/gl-core/Core.tsx
'use client';

import config from './config.json';
import { TCore } from './types';
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
  useVersionCheck,
  IncludeAll,
  useThemeMode,
  toggleLoading,
  useDispatch,
  useSlice,
  Siblings,
  useSiblings,
} from '../gl-core';
import { SideAds } from '../gl-core';
import { FlickrAlbum } from './cartridges/Flickr';
import { CV } from './cartridges/CV';
import { Bouncer } from './cartridges/Bouncer';
import { Fallmanager } from './cartridges/Fallmanager';
import { Admin } from './cartridges/Admin';

export default function Core({ frontmatter, body = null }: TCore) {
  let fullScreen = false;
  const { hideImage } = useSlice();
  const siblings = useSiblings();
  const pathname = usePathname();
  const router = useRouter();
  const themeMode = useThemeMode();
  useVersionCheck();

  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (pathname === '/cv') {
      router.replace('/work/cv');
    }
    if (pathname === '/flickr') {
      router.replace('/work/core/cartridges/flickr');
    }
    if (pathname === '/free/flickr') {
      router.replace('/work/core/cartridges/flickr');
    }
  }, [pathname, router]);

  React.useEffect(() => {
    dispatch(toggleLoading(false));
  }, [dispatch]);

  const isCV = pathname === '/work/cv';
  // const isCV = false;
  const isFallmanager = pathname.startsWith('/fallmanager');
  const isAdmin = pathname.startsWith('/admin');
  const isApp = isCV || isFallmanager || isAdmin;

  const [imageError, setImageError] = React.useState(false);

  let app = <></>;
  switch (true) {
    case isAdmin:
      fullScreen = true;
      app = (
        <Bouncer>
          <IncludeAll />
          <Admin />
        </Bouncer>
      );
      break;
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
      <Container id="core">
        <Box sx={{ minHeight: '100vh' }}>
          <Header frontmatter={frontmatter} />

          <Grid container spacing={isMobile ? 0 : 1}>
  {/* Left column (siblings / side ads) */}
  {!isMobile && (
    <Grid size={{ md: 3 }}>
      <Box sx={{ mt: 1 }}>
        {Array.isArray(siblings) && siblings.length > 0 ? (
          <Siblings />
        ) : (
          <SideAds />
        )}
      </Box>
    </Grid>
  )}

  {/* Main content */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Box sx={{ mt: isMobile ? 2 : 0 }}>
      {/* On mobile, show image first */}
      {isMobile && !hideImage && frontmatter?.image && (
        <Box sx={{ mx: 0, mt: 0 }}>
          {!imageError ? (
            <Image
              priority
              src={frontmatter.image}
              alt={frontmatter.title || 'Featured image'}
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto' }}
              onError={() => setImageError(true)}
            />
          ) : (
            <Box>
              <Skeleton variant="rectangular" width="100%" height={315} />
              <Typography variant="body2" color="text.secondary" mt={1}>
                "{frontmatter.image}" not found.
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* On mobile, show FlickrAlbum after image but before markdown */}
      {isMobile && (
        <Box sx={{ mt: 0, mx: 0 }}>
          <FlickrAlbum album="72177720327633973" />
        </Box>
      )}

      {/* On desktop, show image before markdown */}
      {!isMobile && !hideImage && frontmatter?.image && (
        <Box sx={{ mx: 4, mt: 0 }}>
          {!imageError ? (
            <Image
              priority
              src={frontmatter.image}
              alt={frontmatter.title || 'Featured image'}
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto' }}
              onError={() => setImageError(true)}
            />
          ) : (
            <Box>
              <Skeleton variant="rectangular" width="100%" height={315} />
              <Typography variant="body2" color="text.secondary" mt={1}>
                "{frontmatter.image}" not found.
              </Typography>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ px: isMobile ? 0.5 : 2, my: 2 }}>
        {pathname !== '/' && <PageBreadcrumb />}
      </Box>
    </Box>

    <Box sx={{ mb: isMobile ? 3 : '175px', px: isMobile ? 0.5 : 2 }}>
      {isApp ? app : <RenderMarkdown>{body}</RenderMarkdown>}
    </Box>
  </Grid>

  {/* Right column (flickr) */}
  {!isMobile && (
    <Grid size={{ md: 3 }} sx={{ mt: 3 }}>
      <FlickrAlbum album="72177720327633973" />
    </Grid>
  )}
</Grid>

        </Box>
      </Container>
    </Theme>
  );
}
