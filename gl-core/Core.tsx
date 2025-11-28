// core/gl-core/Core.tsx
'use client';
import { TFeedback } from './cartridges/DesignSystem/types';
import configRaw from './config.json';
import { TCore, TConfig } from './types';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  useMediaQuery,
  Container,
  Box,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import {
  fetchGlobalNav,
  RenderMarkdown,
  PageBreadcrumb,
  useIsMobile,
  useVersionCheck,
  useDispatch,
  Siblings,
  useSiblings,
  SideAds,
  SharePopup,
  Icon,
} from '../gl-core';
import {
  Paywall,
  SigninGate,
  useUser,
} from './cartridges/Paywall';
import {
  DesignSystem,
  useDesignSystem,
  setFeedback,
  setDesignSystemKey,
  NewContent,
  toggleLoading,
} from './cartridges/DesignSystem';
import { useNewContent } from './cartridges/Uberedux';

const config = configRaw as TConfig;

export default function Core({ frontmatter, body = null }: TCore) {
  const dispatch = useDispatch();
  const newContent = useNewContent();
  const { noImage, image, icon, title, description, paywall } =
    frontmatter ?? {};
  const [imageError, setImageError] = React.useState(false);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const siblings = useSiblings();
  const pathname = usePathname();
  const { themeMode, feedbackTested } = useDesignSystem();
  const isMobile = useIsMobile();
  const user = useUser();
  const fetchedNavRef = React.useRef(false);

  React.useEffect(() => {
    if (fetchedNavRef.current) return;
    fetchedNavRef.current = true;
    dispatch(fetchGlobalNav());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(toggleLoading(false));
  }, [dispatch]);

  // Test out our Feedback component by triggering it here
  React.useEffect(() => {
    if (!feedbackTested) {
      // const feedback: TFeedback = {
      //   severity: 'info',
      //   title: 'Connecting...',
      // };
      // dispatch(setFeedback(feedback));
      dispatch(setDesignSystemKey('feedbackTested', true));
    }
  }, [dispatch, feedbackTested]);

  useVersionCheck();

  const effectiveThemeMode =
    themeMode === null ? (prefersDark ? 'dark' : 'light') : themeMode;

  const isAuthed = !!(user && user.uid);

  return (
    <>
      <DesignSystem theme={config.themes[effectiveThemeMode]}>
        <Paywall />
        <Container id="core" sx={{ mt: 2 }}>
          <Box sx={{ minHeight: '100vh' }}>
            <Grid container spacing={isMobile ? 0 : 1}>
              <Grid size={{ xs: 1, md: 3 }}>
                <Box
                  sx={{
                    overflow: 'hidden',
                    ml: isMobile ? -3 : 0,
                    mt: 0,
                  }}
                >
                  {!isMobile && (
                    <>
                      <Box sx={{ mb: 2 }}>
                        {newContent?.map((item: any, i: number) => (
                          <NewContent key={`content_${i}`} slug={item.slug} />
                        ))}
                      </Box>
                    </>
                  )}

                  {Array.isArray(siblings) && siblings.length > 0 ? (
                    <Siblings />
                  ) : (
                    <SideAds />
                  )}
                </Box>
              </Grid>

              <Grid size={{ xs: 11, md: 9 }}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ mr: 2, mt: 1.5 }}>
                    <Icon icon={icon as any} color="primary" />
                  </Box>

                  <Typography
                    variant="h1"
                    gutterBottom
                    color="primary"
                    sx={{
                      mt: 0.5,
                      fontSize: { xs: '1.6rem', md: '2rem' },
                    }}
                  >
                    {title !== 'Home' ? title : 'Goldlabel Apps'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ ml: -1, mt: -1, mr: 1 }}>
                    <SharePopup />
                  </Box>
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {description}
                  </Typography>
                </Box>

                {title !== 'Home' && pathname !== '/' && <PageBreadcrumb />}

                {/* CONTENT AREA */}
                <Box sx={{ mt: 2, mb: isMobile ? 3 : '175px' }}>
                  {/* PAYWALL MODE */}
                  {paywall === true && !isAuthed ? (
                    <Grid
                      container
                      spacing={2}
                      sx={{ alignItems: 'flex-start' }}
                    >
                      {/* Left: Gate */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        <SigninGate />
                      </Grid>

                      {/* Right: Image */}
                      <Grid size={{ xs: 12, md: 6 }}>
                        {!noImage && image && (
                          <Box>
                            {!imageError ? (
                              <Image
                                priority
                                src={image}
                                alt={title || 'Featured image'}
                                width={1200}
                                height={630}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                  maxHeight: isMobile ? 'none' : '420px',
                                  objectFit: 'cover',
                                  borderRadius: 8,
                                }}
                                onError={() => setImageError(true)}
                              />
                            ) : (
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={315}
                              />
                            )}
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      {!noImage && image && (
                        <Box>
                          {!imageError ? (
                            <Image
                              priority
                              src={image}
                              alt={title || 'Featured image'}
                              width={1200}
                              height={630}
                              style={{
                                borderRadius: 8,
                                width: '100%',
                                height: 'auto',
                                maxHeight: isMobile ? 'none' : '315px',
                                objectFit: 'cover',
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
                                "{image}" not found.
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                      <RenderMarkdown>{body}</RenderMarkdown>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </DesignSystem>
    </>
  );
}
