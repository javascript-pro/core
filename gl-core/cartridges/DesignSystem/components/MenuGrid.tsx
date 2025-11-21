// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/components/MenuGrid.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { routeTo, useDispatch, Icon, reset } from '../../../../gl-core';
import { useDesignSystem, setDesignSystemKey } from '../../DesignSystem';
import { User, Continue, useUser } from '../../Paywall';

export default function MenuGrid() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useUser();
  const ds = useDesignSystem();
  const { themeMode } = ds;

  const handleToggle = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    dispatch(setDesignSystemKey('themeMode', newMode));
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <List dense disablePadding>
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

            <ListItemButton
              onClick={() => {
                handleToggle();
              }}
            >
              <ListItemIcon>
                <Icon
                  color="primary"
                  icon={
                    themeMode === 'dark' ? 'lightmode' : ('darkmode' as any)
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={themeMode === 'dark' ? 'Light mode' : 'Dark mode'}
              />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                dispatch(setDesignSystemKey('dialog', null));
                dispatch(reset());
              }}
            >
              <ListItemIcon>
                <Icon icon="reset" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Restart" />
            </ListItemButton>
          </List>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>{!user ? <Continue /> : <User />}</Grid>
      </Grid>

      {/* <pre>dialog: {JSON.stringify(ds.dialog, null, 2)}</pre> */}
    </>
  );
}

/*

*/
