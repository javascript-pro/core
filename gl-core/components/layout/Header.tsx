// core/gl-core/components/layout/Header.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  CardHeader,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Icon, useIsMobile, ThumbMenu, SharePopup } from '../../../gl-core';

export type THeader = {
  frontmatter?: any;
  loading?: boolean;
  [key: string]: any;
};

export default function Header({
  loading = false,
  frontmatter = null,
}: THeader) {
  const { title, description, icon } = frontmatter;
  const router = useRouter();
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
        action={loading ? <CircularProgress /> 
          : <Box sx={{mt:1, mr: isMobile ? 0 : 2}}>
              <SharePopup frontmatter={frontmatter} />
            </Box>
        }
      />
      <ThumbMenu frontmatter={frontmatter} />
    </>
  );
}
