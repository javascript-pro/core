// core/gl-core/Core.tsx
'use client';

import configRaw from './config.json';
import { TCore, TConfig } from './types';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  useMediaQuery,
  CssBaseline,
  Container,
  Box,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import {
  useGlobalNav,
  fetchGlobalNav,
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
  Siblings,
  Children,
  useSiblings,
  ArrowMenu,
} from '../gl-core';
import { SideAds } from '../gl-core';

const config = configRaw as TConfig;

export default function Core({ frontmatter, body = null }: TCore) {
  const dispatch = useDispatch();
  const { noImage, image, title } = frontmatter ?? {};
  const [imageError, setImageError] = React.useState(false);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const siblings = useSiblings();
  const pathname = usePathname();
  const themeMode = useThemeMode();
  const isMobile = useIsMobile();
  const globalNav = useGlobalNav();

  // Always attempt to fetch nav; fetchGlobalNav itself handles cache timing
  React.useEffect(() => {
    dispatch(fetchGlobalNav());
  }, [dispatch]);

  // Log out current nav in store
  React.useEffect(() => {
    if (globalNav) {
      console.log('Core: globalNav available', globalNav);
    }
  }, [globalNav]);

  useVersionCheck();

  React.useEffect(() => {
    dispatch(toggleLoading(false));
  }, [dispatch]);

  const effectiveThemeMode =
    themeMode === null ? (prefersDark ? 'dark' : 'light') : themeMode;

  return (
    <Theme theme={config.themes[effectiveThemeMode]}>
      <CssBaseline />
      <IncludeAll />
      <Container id="core" maxWidth="md">
        <Box sx={{ minHeight: '100vh' }}>
          <Header frontmatter={frontmatter} />
          <Grid container spacing={isMobile ? 0 : 1}>
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

            <Grid size={{ xs: 12, md: 9 }}>
              <Box sx={{ mt: isMobile ? 2 : 0 }}>
                {/* Image block */}
                {!noImage && image && (
                  <Box sx={{ mx: isMobile ? 0 : 4, mt: 0 }}>
                    {!imageError ? (
                      <Image
                        priority
                        src={image}
                        alt={title || 'Featured image'}
                        width={1200}
                        height={630}
                        style={{ width: '100%', height: 'auto' }}
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
                          "{image}" not found.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}

                <Box sx={{ px: isMobile ? 0.5 : 2, my: 2 }}>
                  <Box sx={{ mx: 0 }}>
                    {pathname !== '/' && <PageBreadcrumb />}
                  </Box>
                  <Box sx={{ mx: 3 }}>
                    <ArrowMenu />
                  </Box>
                </Box>
              </Box>

              {/* Main content and children combined in same padded box */}
              <Box sx={{ mb: isMobile ? 3 : '175px', px: isMobile ? 0.5 : 2 }}>
                <RenderMarkdown>{body}</RenderMarkdown>
                {isMobile && (
                  <Box sx={{ mt: 4 }}>
                    <Children />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Theme>
  );
}
