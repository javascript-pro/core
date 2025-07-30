// core/gl-core/cartridges/Admin/Admin.tsx
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { CssBaseline } from '@mui/material';
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

  return (
    <>
      <CssBaseline />
      <Layout>
        <Header />
        {pathname === '/admin/auth' && <AuthAdmin />}
        {pathname === '/admin/bouncer' && <BouncerAdmin />}
        {pathname === '/admin/flickr' && <FlickrAdmin />}
        {pathname === '/admin/resend' && <ResendAdmin />}
        {pathname === '/admin' && <MenuList />}
      </Layout>
    </>
  );
}
