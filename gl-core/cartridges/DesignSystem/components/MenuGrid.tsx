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
import {
  routeTo,
  useDispatch,
  Icon,
  useIsMobile,
  reset,
} from '../../../../gl-core';
import { useDesignSystem, setDesignSystemKey } from '../../DesignSystem';
import { SelectLang } from '../../Lingua';

export default function MenuGrid() {

  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();
  const {themeMode} = ds;
  // console.log('SystemDialog ds.dialog', ds.dialog);

  const handleToggle = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    dispatch(setDesignSystemKey('themeMode', newMode));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <List>
            <ListItemButton
              onClick={() => {
                dispatch(setDesignSystemKey('dialog', null));
                dispatch(routeTo('/bad-panda', router));
              }}
            >
              <ListItemIcon>
                <Icon icon="bug" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Bad Panda" secondary="Page not found, bro" />
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
              <ListItemText primary="Restart" secondary="Back to the future" />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                handleToggle()
              }}
            >
              <ListItemIcon>
                <Icon color="primary" icon={themeMode === 'dark' ? 'lightmode' : ('darkmode' as any)} />
              </ListItemIcon>
              <ListItemText
                primary="Switch to..."
                secondary={themeMode === 'dark' ? 'Light mode' : 'Dark mode'} 
               />
            </ListItemButton>

          </List>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          

          <SelectLang />
        </Grid>
      </Grid>

      {/* <pre>dialog: {JSON.stringify(ds.dialog, null, 2)}</pre> */}
    </>
  );
}

/*

*/
