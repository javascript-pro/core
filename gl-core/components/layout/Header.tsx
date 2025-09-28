// core/gl-core/components/layout/Header.tsx
'use client';
import * as React from 'react';
import { Box, CardHeader, Typography } from '@mui/material';
import { Icon, useIsMobile, ThumbMenu, SharePopup } from '../../../gl-core';

import { Bouncer } from '../../cartridges/Bouncer';

export type THeader = {
  frontmatter?: any;
  [key: string]: any;
};

export default function Header({ frontmatter = null }: THeader) {
  const { title, description, icon } = frontmatter;
  const isMobile = useIsMobile();

  return (
    <>
      <CardHeader
        avatar={<Icon icon={icon} color="primary" />}
        title={
          !isMobile && (
            <Typography sx={{}} variant={'h6'} component={'h1'}>
              {title}
            </Typography>
          )
        }
        subheader={
          !isMobile && (
            <Typography sx={{}} variant={'body2'} component={'h2'}>
              {description}
            </Typography>
          )
        }
        action={
          <Box sx={{ mt: 1, mr: isMobile ? 0 : 2 }}>
            <Bouncer />
            <SharePopup frontmatter={frontmatter} />
          </Box>
        }
      />
      <ThumbMenu frontmatter={frontmatter} />
    </>
  );
}
