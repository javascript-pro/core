'use client';
import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Box, Grid, CardHeader, useMediaQuery, useTheme } from '@mui/material';
import { FolderNav, Icon, AppBreadcrumb, MobileMenu } from '../../../';

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
  const { title, image } = frontmatter;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ px: 2 }}>
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
          <CardHeader
            sx={{ ml: -2 }}
            avatar={<Icon icon={frontmatter?.icon as any} />}
            title={frontmatter?.title}
            subheader={frontmatter?.description}
            action={isMobile ? <MobileMenu>
               <FolderNav />
            </MobileMenu> : null}
          />
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
