'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon } from '../';

export type FeaturedProps = {
  featured?: {
    slug: string;
    frontmatter: {
      title: string;
      description?: string;
      icon?: string;
    };
  }[];
};

export default function Featured({ featured = [] }: FeaturedProps) {
  const router = useRouter();

  const handleItemClick = (slug: string) => {
    router.push(slug);
  };

  return (
    <Box sx={{ mt: 0 }}>
      <List dense>
        {featured.map(({ slug, frontmatter }) => {
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
    </Box>
  );
}
