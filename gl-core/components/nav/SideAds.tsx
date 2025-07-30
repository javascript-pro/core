// core/gl-core/components/nav/SideAds.tsx
'use client';

import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch, routeTo, Icon } from '../../../gl-core';
import { useRouter, usePathname } from 'next/navigation';

export type TSideAds = {
  children?: React.ReactNode;
  [key: string]: any;
};

export default function SideAds() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // get current path

  const items = [
    { icon: 'home', title: 'Home', path: '/' },
    { icon: 'ki', title: 'AKI', path: '/work/abgeschottet-ki' },
    // { icon: 'openai', title: 'C.V.', path: '/work/cv' },
    { icon: 'contact', title: 'About us', path: '/work/company' },
  ];

  return (
    <Box>
      <List dense>
        {items.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItemButton
              key={item.title}
              disabled={isActive}
              onClick={() => {
                if (!isActive) {
                  dispatch(routeTo(item.path, router));
                }
              }}
            >
              <ListItemIcon>
                <Icon icon={item.icon as any} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
