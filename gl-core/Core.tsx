// core/gl-core/Core.tsx
'use client';

import config from './config.json';
import { TCore } from './types';
import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  Children,
  useSiblings,
  ArrowMenu,
} from '../gl-core';

import { SideAds } from '../gl-core';
import { Bouncer, setUid } from './cartridges/Bouncer';
import { Admin } from './cartridges/Admin';

export default function Core({ frontmatter, body = null }: TCore) {
  const { noImage } = frontmatter;
  let fullScreen = false;
  const [loading, setLoading] = React.useState(true);
  const siblings = useSiblings();
  const pathname = usePathname();
  const router = useRouter();
  const themeMode = useThemeMode();
  useVersionCheck();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUid(user.uid));
      } else {
        dispatch(setUid(null));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(toggleLoading(false));
  }, [dispatch]);

  const isAdmin = pathname.startsWith('/admin');
  const isApp = isAdmin;

  let app = <></>;
  switch (true) {
    case isAdmin:
      fullScreen = true;
      app = (
        <Bouncer>
          <Theme theme={config.themes[themeMode] as any}>
            <CssBaseline />
            <Admin />
          </Theme>
        </Bouncer>
      );
      break;

    default:
      break;
  }

  if (fullScreen) return <>{app}</>;

  return (
    <Theme theme={config.themes[themeMode] as any}>
      <CssBaseline />
      <IncludeAll />
      <Container id="core" maxWidth="md">
        <Box sx={{ minHeight: '100vh' }}>
          <Header frontmatter={frontmatter} loading={loading} />
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
                {!noImage && frontmatter?.image && (
                  <Box sx={{ mx: isMobile ? 0 : 4, mt: 0 }}>
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
                {isApp ? app : <RenderMarkdown>{body}</RenderMarkdown>}
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
