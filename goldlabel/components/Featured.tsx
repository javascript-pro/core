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
  folderLabel?: string;
};

export default function Featured({
  featured = [],
  folderLabel,
}: FeaturedProps) {
  const showFeatured = false;
  const router = useRouter();

  const handleItemClick = (slug: string) => {
    router.push(slug);
  };

  // Sort by frontmatter.order (default to 0 if undefined)
  const sorted = [...featured].sort(
    (a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0),
  );

  if (!showFeatured) return null;

  return (
    <Box sx={{ mt: 0 }}>
      {folderLabel && (
        <Typography sx={{ mx: 2 }} variant="button">
          {folderLabel}
        </Typography>
      )}

      <List dense>
        <ListItemButton
          onClick={() => handleItemClick('/work/products/good-fit')}
        >
          <ListItemIcon sx={{ alignSelf: 'flex-start', mt: 1 }}>
            <Icon icon={'good-fit'} />
          </ListItemIcon>
          <ListItemText
            primary={'Good Fit?'}
            // secondary="Paste in a job description, get an instantly tailored CV"
          />
        </ListItemButton>

        {/* Future featured items */}
        {/* <ListItemButton onClick={() => handleItemClick('/work/products/speak-write')}>
          <ListItemIcon sx={{ alignSelf: 'flex-start', mt: 1 }}>
            <Icon icon={'speak-write'} color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={'SpeakWrite'}
            secondary="Foreseen by Orwell in 1984, built by us for reals just now"
          />
        </ListItemButton> */}
      </List>

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
    </Box>
  );
}
