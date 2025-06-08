// core/gl-core/components/nav/TopRightMenu.tsx

'use client';
import * as React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon, useDispatch, navigateTo } from '../../../gl-core';
import { firebaseAuth, useUser } from '../../cartridges/Bouncer';

export type TTopRightMenu = {
  frontmatter?: {
    icon?: string;
    title?: string;
    description?: string;
  };
  [key: string]: any;
};

export default function TopRightMenu(
  {
    // frontmatter = {
    //   icon: 'home',
    //   title: 'title',
    //   description: 'description',
    // },
  }: TTopRightMenu,
) {
  // const { title, icon } = frontmatter;
  const dispatch = useDispatch();
  const user = useUser();
  // console.log('user', user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    dispatch(firebaseAuth('signout'));
  };

  const handleSignin = () => {
    dispatch(navigateTo('/signin'));
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="menu" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <Icon icon={icon as any} />
          </ListItemIcon>
          <ListItemText primary={title} />
        </MenuItem> */}

        {user ? (
          <MenuItem onClick={handleSignout}>
            <ListItemIcon>
              <Icon icon="signout" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        ) : (
          <MenuItem onClick={handleSignin}>
            <ListItemIcon>
              <Icon icon="signin" />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
