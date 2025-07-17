// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/Admin.tsx
'use client';

import * as React from 'react';
import { config } from './config';
import { useRouter, usePathname } from 'next/navigation';
import { CssBaseline } from '@mui/material';
import { Theme, useDispatch, routeTo } from '../../../gl-core';
import { Layout, FlickrAdmin, Header, MenuList, AuthAdmin } from '../Admin';

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
        {pathname === '/admin/auth' && <AuthAdmin />}
        {pathname === '/admin/flickr' && <FlickrAdmin />}
        {pathname === '/admin' && <MenuList />}
      </Layout>
    </Theme>
  );
}
