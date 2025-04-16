'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Icon } from '../';

export type FeaturedProps = {
  featured?: {
    slug: string;
    frontmatter: {
      title: string;
      description?: string;
      icon?: string;
      order?: number;
    };
  }[];
};

export default function Featured({ featured = [] }: FeaturedProps) {
  const router = useRouter();

  const handleItemClick = (slug: string) => {
    router.push(slug);
  };

  // Sort by frontmatter.order (default to 0 if undefined)
  const sorted = [...featured].sort(
    (a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0),
  );

  return (
    <Box sx={{ mt: 0 }}>
      <List dense>
        {sorted.map(({ slug, frontmatter }) => {
          const { title, icon } = frontmatter;
          return (
            <ListItemButton key={slug} onClick={() => handleItemClick(slug)}>
              {icon && (
                <ListItemIcon>
                  <Icon icon={icon as any} />
                </ListItemIcon>
              )}
              <ListItemText primary={title} />
            </ListItemButton>
          );
        })}
      </List>
        <Typography variant="button" sx={{}}>
          Examples
        </Typography>
      <List dense>
        <ListItemButton onClick={() => handleItemClick('/examples/good-fit')}>
          <ListItemIcon>
            <Icon icon={'star'} />
          </ListItemIcon>
          <ListItemText primary={'Good Fit?'} />
        </ListItemButton>
        <ListItemButton onClick={() => handleItemClick('/examples/speak-write')}>
          <ListItemIcon>
            <Icon icon={'star'} />
          </ListItemIcon>
          <ListItemText 
            primary={'Speak Write'} />
        </ListItemButton>
      </List>
    </Box>
  );
}
