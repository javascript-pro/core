// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/components/MenuList.tsx

'use client';

import * as React from 'react';
import {
  CssBaseline,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CardContent,
} from '@mui/material';
import { MightyButton, Icon, routeTo, useDispatch } from '../../../../gl-core';
import { useRouter, usePathname } from 'next/navigation';

export default function MenuList() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (route: string) => {
    dispatch(routeTo(route, router));
  };

  return (
    <Box>
      <List>
        {/* <ListItemButton>
          <ListItemIcon>
            <Icon icon="bouncer" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Bouncer" />
        </ListItemButton> */}
        <ListItemButton
          onClick={() => {
            // console.log("Home");
            handleClick('/admin/flickr');
          }}
        >
          <ListItemIcon>
            <Icon icon="flickr" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Flickr" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            handleClick('/admin/users');
          }}
        >
          <ListItemIcon>
            <Icon icon="users" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </List>
    </Box>
  );
}
