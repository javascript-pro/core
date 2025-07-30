// core/gl-core/components/layout/Header.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  IconButton,
  CardHeader,
  Typography,
  Tooltip,
} from '@mui/material';
import { Icon, useIsMobile, ThumbMenu } from '../../../gl-core';
import { Visitor } from '../../cartridges/Bouncer';

export type THeader = {
  frontmatter?: any;
  [key: string]: any;
};

export default function Header({ frontmatter = null }: THeader) {
  const { title, description, icon } = frontmatter;
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      <CardHeader
        avatar={
          <>
            <Tooltip title="Home">
              <IconButton
                sx={{ ml: -1 }}
                onClick={() => {
                  router.push('/');
                }}
              >
                <Icon icon={icon} />
              </IconButton>
            </Tooltip>
            {/* <Box sx={{ m: 1 }}>
              <Icon icon={icon as any} />
            </Box> */}
          </>
        }
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
        // action={
        //   <Box sx={{ display: 'flex' }}>
        //     <Visitor />
        //   </Box>
        // }
      />
      <ThumbMenu frontmatter={frontmatter} />
    </>
  );
}
