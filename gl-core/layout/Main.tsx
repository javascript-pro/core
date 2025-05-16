'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Container, Grid } from '@mui/material';
import {
  Share,
  RenderMarkdown,
  PageBreadcrumb,
  useIsMobile,
  MainMenu,
} from '../';

export type TMain = {
  body?: string;
  frontmatter?: any;
};

export default function Main({ body = '', frontmatter = null }: TMain) {
  
  const isMobile = useIsMobile();
  const featuredImage = frontmatter?.image || null;

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            md: 9,
          }}
        >
          <Box sx={{ my: 1, display: 'flex' }}>
            <Box sx={{ ml: -1, mr: 1 }}>
              <Share frontmatter={frontmatter} body={body} />
            </Box>
            <PageBreadcrumb />
          </Box>
          {featuredImage && (
            <Box
              position="relative"
              width="100%"
              height={0}
              paddingTop="50%" // maintains a 2:1 aspect ratio
              mb={2}
              borderRadius={2}
              overflow="hidden"
            >
              <Image
                priority
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={featuredImage}
                alt={frontmatter?.title || 'Featured image'}
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )}

          <RenderMarkdown>{body}</RenderMarkdown>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          {/* <Share frontmatter={frontmatter} /> */}
          {!isMobile ? <MainMenu /> : null}
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          {/* <Share frontmatter={frontmatter} /> */}
          {!isMobile ? <MainMenu /> : null}
        </Grid>
      </Grid>
    </Container>
  );
}
