'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, CardHeader, Typography } from '@mui/material';
import { Icon, ShareThis } from '../../../gl-core';

export type THeader = {
  frontmatter?: any;
};

export default function Header({ frontmatter = null }: THeader) {
  const { title, description, icon } = frontmatter;
  const router = useRouter();

  return (
    <>
      <CardHeader
        sx={{
          mx: 2,
        }}
        avatar={
          <>
            <IconButton
              onClick={() => {
                router.push('/');
              }}
            >
              <Icon icon={'blokey'} />
            </IconButton>
            {icon !== 'blokey' ? (
              <IconButton disabled>
                <Icon icon={icon as any} />
              </IconButton>
            ) : null}
          </>
        }
        title={
          <Typography sx={{}} variant={'body1'} component={'h1'}>
            {title}
          </Typography>
        }
        subheader={
          <Typography sx={{}} variant={'body2'} component={'h2'}>
            {description}
          </Typography>
        }
        action={
          <>
            <ShareThis title={title} description={description} />
          </>
        }
      />
    </>
  );
}
