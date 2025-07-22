// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/Admin.tsx
'use client';

import * as React from 'react';
import { config } from './config';
import { usePathname } from 'next/navigation';
import { CssBaseline } from '@mui/material';
import { Theme } from '../../../gl-core';
import {
  Layout,
  FlickrAdmin,
  Header,
  MenuList,
  AuthAdmin,
  ResendAdmin,
} from '../Admin';
import { BouncerAdmin } from '../Bouncer';

export default function Admin() {
  const pathname = usePathname();
  const currentTheme = config.themes.light;

  return (
    <Theme theme={currentTheme as any}>
      <CssBaseline />
      <Layout>
        <Header />
        {pathname === '/admin/auth' && <AuthAdmin />}
        {pathname === '/admin/visitors' && <BouncerAdmin />}
        {pathname === '/admin/flickr' && <FlickrAdmin />}
        {pathname === '/admin/resend' && <ResendAdmin />}
        {pathname === '/admin' && <MenuList />}
      </Layout>
    </Theme>
  );
}
