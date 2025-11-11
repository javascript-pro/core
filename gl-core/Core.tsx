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
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  fetchGlobalNav,
  Theme,
  RenderMarkdown,
  ThumbMenu,
  PageBreadcrumb,
  useIsMobile,
  useVersionCheck,
  IncludeAll,
  useThemeMode,
  toggleLoading,
  useDispatch,
  Siblings,
  Search,
  useSiblings,
  Icon,
  SideAds,
  SharePopup,
} from '../gl-core';
// import { SoundProvider } from './cartridges/Theme';
import { Paywall, SigninGate, useUser, Tings } from './cartridges/Paywall';

const config = configRaw as TConfig;

export default function Core({ frontmatter, body = null }: TCore) {
  const dispatch = useDispatch();
  const { noImage, image, title, description, paywall } = frontmatter ?? {};
  const [imageError, setImageError] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const siblings = useSiblings();
  const pathname = usePathname();
  const themeMode = useThemeMode();
  const isMobile = useIsMobile();
  const user = useUser(); // 🔐 check user state
  const fetchedNavRef = React.useRef(false);

  React.useEffect(() => {
    if (fetchedNavRef.current) return;
    fetchedNavRef.current = true;
    dispatch(fetchGlobalNav());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(toggleLoading(false));
  }, [dispatch]);

  useVersionCheck();

  const effectiveThemeMode =
    themeMode === null ? (prefersDark ? 'dark' : 'light') : themeMode;

  const isAuthed = !!(user && user.uid); // ✅ logged-in flag

  return (
    <>
      <Theme theme={config.themes[effectiveThemeMode]}>
        <CssBaseline />
        <IncludeAll />

        {/* Sticky Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            backgroundColor: (theme) => theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
            py: 0.5,
          }}
        >
          <Box>
            <IconButton
              color="primary"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon icon="menu" />
            </IconButton>
          </Box>

          <Box sx={{}}>
            <Paywall />
          </Box>
        </Box>

        {/* Menu Dialog */}
        <Dialog
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          fullScreen={isMobile}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pb: 0,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Search defaultValue={frontmatter?.title} />
            </Box>
            <IconButton
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              size="small"
            >
              <Icon icon="close" />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <Siblings />
            </Box>
          </DialogContent>
        </Dialog>

        <Container id="core" maxWidth="md">
          <Box sx={{ minHeight: '100vh' }}>
            <Grid container spacing={isMobile ? 0 : 1}>
              {!isMobile && (
                <Grid size={{ md: 3 }}>
                  <Box sx={{ mt: 1 }}>
                    <Search />
                    {Array.isArray(siblings) && siblings.length > 0 ? (
                      <>
                        <Siblings />
                      </>
                    ) : (
                      <>
                        <SideAds />
                      </>
                    )}
                  </Box>
                </Grid>
              )}

              <Grid size={{ xs: 12, md: 9 }}>
                <Box sx={{ mt: 2, mb: 2 }}>
                  {title !== 'Home' && (
                    <>
                      <Typography
                        variant="h1"
                        gutterBottom
                        color="primary"
                        sx={{
                          fontSize: { xs: '1.75rem', md: '2.25rem' },
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="h2"
                        gutterBottom
                        sx={{
                          fontSize: { xs: '1.2rem', md: '1.25rem' },
                        }}
                      >
                        {description}
                      </Typography>
                    </>
                  )}
                </Box>

                <Box sx={{display: 'flex'}}>
                  <Box sx={{ml:-1}}>
                    <SharePopup />
                  </Box>
                  <Box sx={{ flexGrow: 1, mt: 1 }}>
                    {pathname !== '/' && <PageBreadcrumb />}
                  </Box>
                </Box>
                
                {/* 🔒 Content area */}
                <Box sx={{ mt: isMobile ? 2 : 4, mb: isMobile ? 3 : '175px' }}>
                  {/* ✅ Authenticated users always bypass paywall */}
                  {paywall === true && !isAuthed ? (
                    <SigninGate />
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
                      <RenderMarkdown>{body}</RenderMarkdown>
                    </>
                  )}
                </Box>
                <ThumbMenu />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Theme>
    </>
  );
}
