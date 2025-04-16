'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
      {/* <Divider /> */}
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
      <Divider />
      <List dense>
        <ListItemButton
          onClick={() => handleItemClick('/work/products/good-fit')}
        >
          <ListItemIcon sx={{ alignSelf: 'flex-start', mt: 1 }}>
            <Icon icon={'good-fit'} />
          </ListItemIcon>
          <ListItemText
            primary={'Good Fit?'}
            secondary="Paste in a job description and our AI will judge if it's a good match. If it is, you’ll get a tailored CV you can download instantly"
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleItemClick('/work/products/speak-write')}
        >
          <ListItemIcon sx={{ alignSelf: 'flex-start', mt: 1 }}>
            <Icon icon={'speak-write'} />
          </ListItemIcon>
          <ListItemText
            primary={'SpeakWrite'}
            secondary="Foreseen by Orwell in 1984, built by us for reals just now"
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
