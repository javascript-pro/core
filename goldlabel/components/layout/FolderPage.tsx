'use client';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Grid, CardHeader } from '@mui/material';
import Image from 'next/image';
import { FolderNav, Icon } from '../../';
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

export default function FolderPage({ frontmatter, content }: FolderPageProps) {
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
          size={{ md: 3 }}
        >
          <FolderNav />
        </Grid>



        
        <Grid size={{ xs: 12, md: 9 }}>
          <CardHeader
            avatar={<Icon icon={frontmatter?.icon as any} />}
            title={frontmatter?.title}
            subheader={frontmatter?.description}
            action={<></>}
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
