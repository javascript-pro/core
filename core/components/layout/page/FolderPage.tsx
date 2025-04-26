'use client';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Grid, CardHeader, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { FolderNav, Icon, AppBreadcrumb } from '../../../';
import { NavItem } from '../../../../core/types';

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
  featured?: any[];
  tree: NavItem[] | null;
  frontmatter: Frontmatter | null;
  content: string | null;
  globalNav: NavItem[];
};

export default function FolderPage({ frontmatter, content }: FolderPageProps) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ px: 0 }}>
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
          <CardHeader
            sx={{ ml: -2 }}
            avatar={<Icon icon={frontmatter?.icon as any} />}
            title={frontmatter?.title}
            subheader={frontmatter?.description}
            action={isMobile ? <>menu btn</> : null}
          />
          {frontmatter?.image && (
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
                src={frontmatter.image}
                alt={frontmatter.title || 'OpenGraph Image'}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 900px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )}
          <AppBreadcrumb />
          {content && <ReactMarkdown>{content}</ReactMarkdown>}
        </Grid>

        <Grid
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
          size={{ xs: 12 }}
        >
          <FolderNav />
        </Grid>
      </Grid>
    </Box>
  );
}
