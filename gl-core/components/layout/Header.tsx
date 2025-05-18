'use client';

import * as React from 'react';
import { CardHeader, Typography } from '@mui/material';
// import { useRouter } from 'next/navigation';

export type THeader = {
  frontmatter?: any;
};

export default function Header({ frontmatter = null }: THeader) {
  // const router = useRouter();
  const { title, description } = frontmatter;

  // const onAvatarClick = () => {
  //   router.push('/');
  // };

  return (
    <>
      <CardHeader
        title={
          <Typography variant={'h4'} component={'h1'}>
            {title}
          </Typography>
        }
        subheader={
          <Typography variant={'body1'} component={'h2'}>
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

*/
