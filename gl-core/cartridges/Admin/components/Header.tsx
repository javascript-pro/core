// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/components/FlickrAdmin.tsx

'use client';

import * as React from 'react';
import { Box, CardHeader } from '@mui/material';
import { MightyButton, Icon, routeTo, useDispatch } from '../../../../gl-core';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const dispatch = useDispatch();
    const router = useRouter();

  const handleClick = (route: string) => {
    dispatch(routeTo(route, router));
  };

  return <CardHeader

          avatar={
            <>
              <MightyButton
                icon="admin"
                label="Admin"
                onClick={() => {
                  handleClick('/admin');
                }}
              />
              
              
            </>
          }
          action={<>
            <MightyButton
              icon="home"
              label="Home"
              onClick={() => {
                handleClick('/');
              }}
              iconPlacement='right'
            />
          </>}
        />;
}
