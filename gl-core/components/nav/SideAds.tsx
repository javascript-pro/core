// /Users/goldlabel/GitHub/core/gl-core/components/nav/SideAds.tsx
'use client';

import * as React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useDispatch, routeTo, Icon } from '../../../gl-core';
import { useRouter } from 'next/navigation';

export type TSideAds = {
  children?: React.ReactNode;
  [key: string]: any;
};

export default function SideAds() {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = [
    { icon: 'home', title: 'Home', path: '/' },
    { icon: 'ki', title: 'Abgeschottet KI', path: '/work/abgeschottet-ki/why' },
    // { icon: 'pdf', title: 'PDF Smash', path: '/work/pdf-smash' },
    // { icon: 'flickr', title: 'Flickr', path: '/flickr' },
    { icon: 'openai', title: 'C.V.', path: '/work/cv' },
    { icon: 'contact', title: 'Contact', path: '/work/company' },
  ];

  return (
    <Box>
      <List dense>
        {items.map((item) => (
          <ListItemButton
            key={item.title}
            onClick={() => {
              dispatch(routeTo(item.path, router));
            }}
          >
            <ListItemIcon>
              <Icon icon={item.icon as any} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
