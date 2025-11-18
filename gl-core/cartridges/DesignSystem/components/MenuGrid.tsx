// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/components/MenuGrid.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
    Grid,
    Menu,
    MenuItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { routeTo, useDispatch, Icon, useIsMobile, reset } from '../../../../gl-core';
import { useDesignSystem, setDesignSystemKey } from '../../DesignSystem';

export default function MenuGrid() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();

  // console.log('SystemDialog ds.dialog', ds.dialog);

  return (
    <>
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={{ xs: 12, md: 6}}>
        <ListItemButton
            onClick={() => {
                dispatch(setDesignSystemKey('dialog', null))
                dispatch(reset());
            }}>
            <ListItemIcon>
                <Icon icon="reset" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Restart" secondary="Back to the future"/>
        </ListItemButton>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6}}>
        <ListItemButton
          sx={{ minWidth: 200 }}
          onClick={() => {
            dispatch(setDesignSystemKey('dialog', null))
            dispatch(routeTo('/bad-panda', router));
          }}
        >
          <ListItemIcon>
            <Icon icon="bug" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Bad Panda"  secondary="Page not found, bro"/>
        </ListItemButton>
      </Grid>
    </Grid>
    
    
    

      {/* <pre>dialog: {JSON.stringify(ds.dialog, null, 2)}</pre> */}
    </>
  );
}

/*

*/
