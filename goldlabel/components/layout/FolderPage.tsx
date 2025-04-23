'use client';
import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
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
  featured?: any[];
  tree: NavItem[] | null;
  frontmatter: Frontmatter | null;
  content: string | null;
  globalNav: NavItem[];
};

export default function FolderPage({
  frontmatter,
  content,
}: FolderPageProps) {

  return (
    <Box sx={{ px: 2 }}>

      <Grid container spacing={2}>

        <Grid size={{ xs: 12, md: 3 }}>
          <FolderContents />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>

          <Typography variant='h6'>
            {frontmatter?.title}
          </Typography>

          <Typography>
            {frontmatter?.description}
          </Typography>

          <AppBreadcrumb />
          
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
        
        

          { content && <ReactMarkdown>{content}</ReactMarkdown>}
        </Grid>
      </Grid>
    </Box>
  );
}
