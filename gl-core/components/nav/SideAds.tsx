// core/gl-core/components/nav/SideAds.tsx
'use client';

import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDispatch, routeTo, useIsMobile } from '../../../gl-core';
import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '../../cartridges/DesignSystem';

export type TSideAds = {
  children?: React.ReactNode;
  [key: string]: any;
};

export default function SideAds() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const items = [
    { icon: 'work', title: 'Work', path: '/work' },
    { icon: 'life', title: 'Life', path: '/life' },
    { icon: 'balance', title: 'Balance', path: '/balance' },
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
                <Icon icon={item.icon as any} color="primary" />
              </ListItemIcon>
              {!isMobile && (
                <ListItemText
                  primary={
                    <Typography variant="body2" noWrap>
                      {item.title}
                    </Typography>
                  }
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
