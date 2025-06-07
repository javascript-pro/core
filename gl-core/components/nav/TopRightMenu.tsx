// core/gl-core/components/nav/TopRightMenu.tsx

'use client';

import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { Icon } from '../../../gl-core';

export type TTopRightMenu = {
  frontmatter?: any;
  [key: string]: any;
};

export default function TopRightMenu({
  frontmatter = {
    icon: 'home',
    title: 'title',
    description: 'description',
  },
}: TTopRightMenu) {
  // console.log("frontmatter", frontmatter);
  const { title, description, icon } = frontmatter;

  return (
    <Box>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Icon icon={icon} />
          </ListItemIcon>
          <ListItemText primary={title} secondary={description} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Icon icon="github" />
          </ListItemIcon>
          <ListItemText primary={'GitHub'} secondary={''} />
        </ListItemButton>
      </List>
    </Box>
  );
}

/*
  {api ? (
    <IconButton onClick={() => dispatch(navigateTo(api, '_blank'))}>
      <Icon icon="api" />
    </IconButton>
  ) : null}

  {github ? (
    <IconButton onClick={() => dispatch(navigateTo(github))}>
      <Icon icon="github" />
    </IconButton>
  ) : null}

  <ShareThis title={title} description={description} />
*/
