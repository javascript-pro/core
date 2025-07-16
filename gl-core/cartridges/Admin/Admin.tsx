// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/Admin.tsx
'use client';

import * as React from 'react';
import { config } from './config';
import { useRouter, usePathname } from 'next/navigation';
import { CssBaseline, Box, CardContent } from '@mui/material';
import { Theme, useDispatch, routeTo } from '../../../gl-core';
import { Layout, FlickrAdmin, Header, MenuList, UsersAdmin } from '../Admin';

export default function Admin() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const currentTheme = config.themes.light;

  const handleListItemClick = (route: string) => {
    dispatch(routeTo(route, router));
  };

  return (
    <Theme theme={currentTheme as any}>
      <CssBaseline />
      <Layout>
        <Header />
        {pathname === '/admin/users' && <UsersAdmin />}
        {pathname === '/admin/flickr' && <FlickrAdmin />}
        {pathname === '/admin' && <MenuList />}
      </Layout>
    </Theme>
  );
}
