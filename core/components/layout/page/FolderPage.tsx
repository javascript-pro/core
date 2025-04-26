'use client';
// import { NavItem } from '../../../../core/types';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Grid, useTheme } from '@mui/material';
import Image from 'next/image';
import { FolderNav, Icon, AppBreadcrumb, MobileMenu, Header } from '../../../';

export type Frontmatter = {
  order?: number;
  title?: string;
  description?: string;
  slug?: string;
  icon?: string;
  image?: string;
  tags?: string[];
  excerpt?: string;
};

export type FolderPageProps = {
  frontmatter: any;
  content: string | null;
};

export default function FolderPage({ frontmatter, content }: FolderPageProps) {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { title, image, description, icon } = frontmatter;

  return (
    <Box sx={{ px: 0 }}>
      <Header title={title} description={description} icon={icon} />

      <Grid container spacing={0}>
        <Grid
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
          size={{ md: 4 }}
        >
          <Box sx={{ height: 24 }} />
          <FolderNav />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {image && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 900,
                aspectRatio: {
                  xs: '1/1',
                  sm: '16/4.5',
                },
                my: { xs: 1, sm: 2 },
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Image
                priority
                src={image}
                alt={title || 'OpenGraph Image'}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 900px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )}
          <AppBreadcrumb />

          {content && <ReactMarkdown>{content}</ReactMarkdown>}
        </Grid>
      </Grid>
    </Box>
  );
}
