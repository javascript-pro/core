'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { Icon } from '../';

export type FeaturedProps = {
  featured?: {
    slug: string;
    frontmatter: {
      title: string;
      description?: string;
      icon?: string;
      image?: string;
    };
  }[];
};

export default function Featured({ featured = [] }: FeaturedProps) {
  const router = useRouter();

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {featured.map((item, i) => {
          const { slug, frontmatter } = item;
          const { title, description, icon, image } = frontmatter;

          return (
            <Grid key={slug} size={{ xs: 12 }}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea
                  onClick={() => router.push(slug)}
                  sx={{ height: '100%' }}
                >
                  {image && (
                    <CardMedia
                      component="img"
                      height="160"
                      image={image}
                      alt={title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {icon && <Icon icon={icon as any} />} {title}
                    </Typography>
                    {description && (
                      <Typography variant="body2" color="text.secondary">
                        {description}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
