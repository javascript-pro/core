'use client';
import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { FolderNav, AppBreadcrumb, Header } from '../../../';

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
    body: string;
  };
};

export default function FilePage({ content }: FilePageProps) {
  const { frontmatter, body } = content;
  const { title, image, description, icon } = frontmatter;

  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ px: 0 }}>
      <Header title={title} description={description} icon={icon} />

      <Grid container spacing={2}>
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
                alt={title || 'Cover image'}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 900px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )}
          <AppBreadcrumb />

          {body && <ReactMarkdown>{body}</ReactMarkdown>}
        </Grid>
      </Grid>
    </Box>
  );
}

/*
<CardHeader
            sx={{ ml: -2 }}
            avatar={<Icon icon={frontmatter?.icon as any} />}
            title={frontmatter?.title}
            subheader={frontmatter?.description}
            action={
              isMobile ? (
                <MobileMenu>
                  <FolderNav />
                </MobileMenu>
              ) : null
            }
          />
*/
