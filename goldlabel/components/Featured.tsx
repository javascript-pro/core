'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, IconButton } from '@mui/material';
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

export default function Featured({}: FeaturedProps) {
  const router = useRouter();

  const handleItemClick = (slug: string) => {
    router.push(slug);
  };

  return (
    <Box sx={{ mt: 0 }}>
      <IconButton onClick={() => handleItemClick('/work/products/good-fit')}>
        <Icon icon={'star'} />
      </IconButton>
    </Box>
  );
}
