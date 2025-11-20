// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/components/MenuGrid.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { routeTo, useDispatch, Icon, reset } from '../../../../gl-core';
import { useDesignSystem, setDesignSystemKey } from '../../DesignSystem';
import { SelectLang } from '../../Lingua';
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
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          {!user ? <Continue /> : <User />}

          <pre>user: {JSON.stringify(user, null, 2)}</pre>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SelectLang />
          <List dense>
            <ListItemButton
              onClick={() => {
                dispatch(setDesignSystemKey('dialog', null));
                dispatch(routeTo('/bad-panda', router));
              }}
            >
              <ListItemText
                primary="Page not found, bro"
                secondary="Bad Panda"
              />
              <ListItemIcon>
                <Icon icon="bug" color="primary" />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                handleToggle();
              }}
            >
              <ListItemText
                primary="Switch to..."
                secondary={themeMode === 'dark' ? 'Light mode' : 'Dark mode'}
              />
              <ListItemIcon>
                <Icon
                  color="primary"
                  icon={
                    themeMode === 'dark' ? 'lightmode' : ('darkmode' as any)
                  }
                />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                dispatch(setDesignSystemKey('dialog', null));
                dispatch(reset());
              }}
            >
              <ListItemText primary="Restart" secondary="Back to the future" />
              <ListItemIcon>
                <Icon icon="reset" color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </List>
        </Grid>
      </Grid>

      {/* <pre>dialog: {JSON.stringify(ds.dialog, null, 2)}</pre> */}
    </>
  );
}

/*

*/
