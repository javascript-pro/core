// core/gl-core/components/layout/Header.tsx
'use client';
import * as React from 'react';
import { Box, CardHeader, Typography } from '@mui/material';
import { Icon, useIsMobile, ThumbMenu, SharePopup } from '../../../gl-core';
import { Paywall } from '../../cartridges/Paywall';
import { Pings, usePings } from '../../cartridges/Pings';

export type THeader = {
  frontmatter?: any;
  [key: string]: any;
};

export default function Header({ frontmatter = null }: THeader) {
  const { title, description, icon } = frontmatter;
  const isMobile = useIsMobile();
  const b = usePings();
  const displayName = b?.livePing?.displayName ?? '';

  let adjustedTitle = title;
  if (adjustedTitle === 'Home') adjustedTitle = 'Goldlabel';

  return (
    <>
      <CardHeader
        avatar={<Icon icon={icon} color="primary" />}
        title={
          !isMobile && (
            <Typography sx={{}} variant={'h6'} component={'h1'}>
              {adjustedTitle}
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
          <Box sx={{ display: 'flex', mt: 1, mr: isMobile ? 0 : 2 }}>
            {/* <Paywall /> */}
            <Pings />

            <SharePopup frontmatter={frontmatter} />
          </Box>
        }
      />

      <ThumbMenu frontmatter={frontmatter} />
    </>
  );
}
