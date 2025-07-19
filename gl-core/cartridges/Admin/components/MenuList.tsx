'use client';

import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon, routeTo, useDispatch } from '../../../../gl-core';
import { useRouter } from 'next/navigation';

type MenuItem = {
  label: string;
  icon: string;
  route: string;
};

const menuItems: MenuItem[] = [
  { label: 'Flickr', icon: 'flickr', route: '/admin/flickr' },
  { label: 'Auth', icon: 'auth', route: '/admin/auth' },
  { label: 'Visitors', icon: 'visitors', route: '/admin/visitors' },
];

export default function MenuList() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (route: string) => {
    dispatch(routeTo(route, router));
  };

  return (
    <Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.route}
            onClick={() => handleClick(item.route)}
          >
            <ListItemIcon>
              <Icon icon={item.icon as any} color="primary" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
