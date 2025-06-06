'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CssBaseline, Box, Grid, Skeleton, Typography } from '@mui/material';
import {
  Theme,
  Advert,
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
      <Box
        id="sidebar"
        component="aside"
        sx={{
          mr: isMobile ? 4.5 : 4,
          ml: 5,
          width: "100%",
        }}
      >
        <Box sx={{mb: 2}}>
          <Advert
            icon="design"
            title={'MUI Toolpad'}
            description={'React-based dashboards powered by live data.'}
            onClick={() => {
              router.push(`/work/techstack/design-sytem/toolpad`);
            }}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <CV mode="advert" />
        </Box>
      

        <Flickr
          mode="album-card"
          id="72177720326317140"
          onClick={() => {
            router.push(`/free/flickr`);
          }}
        />

      </Box>
    </Grid>
  );

  return (
    <Theme>
      <CssBaseline />
      <Box id="core">
        <Box id="content">
          <Header frontmatter={frontmatter} />
          <Grid container spacing={1}>
            {!isMobile && getAside()}
            <Grid
              size={{
                md: 9,
                lg: 10,
              }}
            >
              <Box
                sx={{
                  px: isMobile ? 0.5 : 2,
                  mb: !isMobile ? 3 : 2,
                }}
              >
                { pathname !== '/' && <PageBreadcrumb />}
              </Box>

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
                          Image not found. "{frontmatter.image}"
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
                
              </Box>

              <Box
                sx={{
                  mb: "50px",
                  px: isMobile ? 0.5 : 2,
                }}
              >
                <Box sx={{ 
                  
                  mt: isMobile ? 2 : 1,
                }} />
                {isApp ? app : <RenderMarkdown>{body}</RenderMarkdown>}
              </Box>
            </Grid>
            
          </Grid>

        </Box>
        {/* {isMobile && getAside()} */}
      </Box>
    </Theme>
  );
}
