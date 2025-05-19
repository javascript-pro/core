'use client';

import * as React from 'react';
import { CardHeader, Typography, useTheme } from '@mui/material';
import { Icon } from '../../../gl-core';

export type THeader = {
  frontmatter?: any;
};

export default function Header({ frontmatter = null }: THeader) {
  const { title, icon } = frontmatter;
  const theme = useTheme();
  return (
    <>
      <CardHeader
        sx={{
          // background: theme.palette.primary.main,
        }}
        avatar={<Icon icon={icon as any} />}
        title={
          <Typography sx={{ mt: 0.5 }} variant={'h5'} component={'h1'}>
            {title}
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
