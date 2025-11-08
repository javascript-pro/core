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
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  useGlobalNav,
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
  ArrowMenu,
  SideAds,
  SharePopup,
  // NavItem,
} from '../gl-core';
import { SoundProvider } from './cartridges/Theme';

const config = configRaw as TConfig;

export default function Core({ frontmatter, body = null }: TCore) {
  const dispatch = useDispatch();
  const { noImage, image, title } = frontmatter ?? {};
  const [imageError, setImageError] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const siblings = useSiblings();
  const pathname = usePathname();
  const themeMode = useThemeMode();
  const isMobile = useIsMobile();
  const globalNav = useGlobalNav();

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

  return (
    <SoundProvider>
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
            // px: 1,
            // py: 0.5,
          }}
        >
          <IconButton
            color="primary"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{mt:1}}>
            <Search defaultValue={frontmatter?.title} />
            <SharePopup frontmatter={frontmatter}/>
          </Box>  
        </Box>

        {/* Menu Dialog */}
        <Dialog
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          fullScreen={isMobile}
          maxWidth="sm"
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

            <Box>
              <Search defaultValue={frontmatter?.title} />
              <SharePopup frontmatter={frontmatter}/>
            </Box> 

            <IconButton
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <ArrowMenu />
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
                    {Array.isArray(siblings) && siblings.length > 0 ? (
                      <Siblings />
                    ) : (
                      <SideAds />
                    )}
                  </Box>
                </Grid>
              )}

              <Grid size={{ xs: 12, md: 9 }}>

                <Box sx={{ mt: 2, mb: 2}}>
                  <Typography
                    variant="h1"
                    gutterBottom
                    color="primary"
                    sx={{
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                    }}
                  >
                    {frontmatter?.title}
                  </Typography>

                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.25rem' },
                    }}
                  >
                    {frontmatter?.description}
                  </Typography>
                </Box>


                <Box sx={{ mt: isMobile ? 2 : 4 }}>
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

                  <Box>
                      {pathname !== '/' && <PageBreadcrumb />}
                  </Box>
                </Box>

                <Box
                  sx={{ mb: isMobile ? 3 : '175px'}}
                >
                  <RenderMarkdown>{body}</RenderMarkdown>
                  <ThumbMenu />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Theme>
    </SoundProvider>
  );
}
