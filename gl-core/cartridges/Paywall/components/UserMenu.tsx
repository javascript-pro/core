// /Users/goldlabel/GitHub/core/gl-core/cartridges/Paywall/components/UserMenu.tsx
'use client';
import * as React from 'react';
// import { useRouter } from 'next/navigation';
import {
  List,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
} from '@mui/material';
import { useDispatch } from '../../../../gl-core';
import { 
  // useUser, 
  SignOut,
} from '../../Paywall';

export default function UserMenu() {
  const dispatch = useDispatch();
  // const router = useRouter();
  // const user = useUser();
  // const ds = useDesignSystem();
  // const { themeMode } = ds;

  // const handleToggle = () => {
  //   const newMode = themeMode === 'dark' ? 'light' : 'dark';
  //   dispatch(setDesignSystemKey('themeMode', newMode));
  // };

  return (
    <>
      <List dense disablePadding>
        <SignOut mode="listitem" />
      </List>
    </>
  );
}

/*
<ListItemButton
    onClick={() => {
    dispatch(setDesignSystemKey('dialog', null));
    dispatch(routeTo('/bad-panda', router));
  }}
>
  <ListItemIcon>
    <Icon icon="bug" color="primary" />
  </ListItemIcon>
  <ListItemText primary="Bad Panda" />
</ListItemButton>
*/
