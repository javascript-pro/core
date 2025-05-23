'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, CardHeader, Typography, Tooltip } from '@mui/material';
import { Icon, ShareThis, useDispatch, navigateTo } from '../../../gl-core';

export type THeader = {
  frontmatter?: any;
};

export default function Header({ frontmatter = null }: THeader) {
  const dispatch = useDispatch();
  const { title, description, icon, github, api } = frontmatter;
  const router = useRouter();

  return (
    <>
      <CardHeader
        sx={{
          mx: 2,
        }}
        avatar={
          <><Tooltip title="Home">
              <IconButton
                onClick={() => {
                  router.push('/');
                }}
              >
                <Icon icon={'blokey'} />
              </IconButton>
            </Tooltip>
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
            { api ? <IconButton
                      onClick={() => dispatch(navigateTo(api, "_blank"))}
                    >
                      <Icon icon="api" />
                    </IconButton> : null }
            
            { github ? <IconButton
                      onClick={() => dispatch(navigateTo(github))}
                    >
                      <Icon icon="github" />
                    </IconButton> : null }
            
            <ShareThis title={title} description={description} />
          </>
        }
      />
    </>
  );
}

/*
<pre style={{fontSize: 10}}>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre>
*/