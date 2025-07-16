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
import { Icon, useIsMobile, TopRightMenu } from '../../../gl-core';
// import { Lingua } from '../../cartridges/Lingua';
import { User } from '../../cartridges/Bouncer';

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
                sx={{ ml: 0 }}
                onClick={() => {
                  router.push('/');
                }}
              >
                <Icon icon={'blokey'} />
              </IconButton>
            </Tooltip>
            {/* <Box sx={{ m: 1 }}>
              <Icon icon={icon as any} />
            </Box> */}
          </>
        }
        title={
          <Typography sx={{}} variant={'h6'} component={'h1'}>
            {title}
          </Typography>
        }
        subheader={
          !isMobile && (
            <Typography sx={{}} variant={'body2'} component={'h2'}>
              {description}
            </Typography>
          )
        }
        action={
          <Box sx={{ display: 'flex' }}>
            <User />

            <TopRightMenu frontmatter={frontmatter} />
          </Box>
        }
      />
    </>
  );
}

/*
<pre style={{fontSize: 10}}>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre>
*/
