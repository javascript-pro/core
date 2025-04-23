'use client';
import * as React from 'react';
import { Box, CardHeader, Grid, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { FolderContents, AppBreadcrumb } from '../../';
import ReactMarkdown from 'react-markdown';
import { NavItem } from '../../../goldlabel/types';

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
  section: string;
  featured?: any[];
  tree: NavItem[] | null;
  frontmatter: Frontmatter | null;
  content: string | null;
  globalNav: NavItem[];
  folderLabel?: string; // NEW PROP
};

export default function FolderPage({
  section,
  frontmatter,
  content,
}: FolderPageProps) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader
        title={frontmatter?.title || section}
        subheader={frontmatter?.description}
      />

      {/* <Box sx={{ mx: 2, mb: 2 }}>
        <AppBreadcrumb />
      </Box> */}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <FolderContents />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>

          { frontmatter?.image && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 900,
                aspectRatio: {
                  xs: '1/1',
                  sm: '16/4.5',
                },
                mb: { xs: 1, sm: 2 },
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
          { content && <ReactMarkdown>{content}</ReactMarkdown>}
        </Grid>
      </Grid>
    </Box>
  );
}
