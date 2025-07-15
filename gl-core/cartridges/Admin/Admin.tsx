// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/Admin.tsx
'use client';

import * as React from 'react';
import { config } from './config';
import { useRouter, usePathname } from 'next/navigation';
import {
  CssBaseline,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CardHeader,
  CardContent,
} from '@mui/material';
import { Theme, useDispatch, MightyButton, routeTo, Icon } from '../../../gl-core';
import { Layout, FlickrAdmin } from '../Admin';

export default function Admin() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const currentTheme = config.themes.light;

  const handleListItemClick = (route: string) => {
    dispatch(routeTo(route, router));
  }

  return (
    <Theme theme={currentTheme as any}>
      <CssBaseline />
      <Layout>
        { pathname === '/admin/flickr' ? <FlickrAdmin /> : <Box>
          <CardHeader 
            avatar={<>
              <MightyButton
                mode="icon"
                icon="home"
                label="Home"
                onClick={() => {
                  handleListItemClick('/');
                }}
              />
              <Box sx={{mt:1}}>
                <Icon icon="admin" color="primary" />
              </Box>
            </>}
          />
          <CardContent>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="users" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary='Users'
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="bouncer" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary='Bouncer'
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  // console.log("Home");
                  handleListItemClick('/admin/flickr');
                }}
                >
                <ListItemIcon>
                  <Icon icon="flickr" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary='Flickr'
                />
              </ListItemButton>
            </List>
          </CardContent>
        </Box> }
        
      </Layout>
    </Theme>
  );
}
