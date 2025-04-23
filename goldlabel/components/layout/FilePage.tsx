'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Box,
  Grid,
  CardHeader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FolderContents, Featured, AppBreadcrumb } from '../../';

export type FilePageProps = {
  content: {
    frontmatter: {
      title?: string;
      subheader?: string;
      excerpt?: string;
      image?: string;
      icon?: string;
      description?: string;
    };
    content: string;
  };
  globalNav?: any;
  featured?: any[];
};

export default function FilePage({ content, featured }: FilePageProps) {
  const { frontmatter, content: body } = content;
  const { title, image, description } = frontmatter;

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ px: 2 }}>
      <CardHeader title={title || 'Untitled'} subheader={description} />

      <Box sx={{ mx: 2, mb: 2 }}>
        <AppBreadcrumb />
      </Box>

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
            mx: { xs: 1.5 },
            mb: { xs: 1, sm: 2 },
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <Image
            priority
            src={image}
            alt={title || 'Cover image'}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 900px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <FolderContents />
              <Featured featured={featured} />
              
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              {content && (
                  <ReactMarkdown>{body}</ReactMarkdown>
              )}
            </Grid>
          </Grid>

    </Box>
  );
}
