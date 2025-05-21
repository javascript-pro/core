'use client';

import * as React from 'react';
import { CardHeader, Typography, useTheme } from '@mui/material';
import { Icon } from '../../../gl-core';

export type THeader = {
  frontmatter?: any;
};

export default function Header({ frontmatter = null }: THeader) {
  const { title, description, icon } = frontmatter;
  const theme = useTheme();
  return (
    <>
      <CardHeader
        sx={{
          mx: 2,
        }}
        avatar={<Icon icon={icon as any} />}
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
      />
    </>
  );
}

/* 

// action={<Nav />}
// action={<IconButton
//   size='small'
//   onClick={onAvatarClick}
// >
//   <Icon icon={icon} />
// </IconButton>}

<pre>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre>


subheader={
  <Typography variant={'body1'} component={'h2'}>
    {description}
  </Typography>
}


*/
