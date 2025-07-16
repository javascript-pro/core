// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/components/UsersAdmin.tsx

'use client';

import * as React from 'react';
import {
  CssBaseline,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CardContent,
} from '@mui/material';
import { MightyButton, Icon, routeTo, useDispatch } from '../../../../gl-core';
import { useRouter, usePathname } from 'next/navigation';

export default function UsersAdmin() {
  const dispatch = useDispatch();
  const router = useRouter();

  // const handleClick = (route: string) => {
  //   dispatch(routeTo(route, router));
  // };

  return <Box>UsersAdmin</Box>;
}
