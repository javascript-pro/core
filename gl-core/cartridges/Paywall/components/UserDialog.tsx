// /Users/goldlabel/GitHub/example-app/gl-core/cartridges/Paywall/components/UserDialog.tsx
'use client';
import * as React from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  CardHeader,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import { useDispatch, useIsMobile, Icon } from '../../../../gl-core';
import {
  useDesignSystem,
  setDesignSystemKey,
} from '../../DesignSystem';
import { useUser, setPaywallKey, usePaywall, SignIn, UserMenu } from '../../Paywall';

export default function UserDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();
  const { fullScreen } = ds;
  const user = useUser();
  const paywall = usePaywall();
  const { dialog } = paywall;

  const handleClose = () => {
    dispatch(setPaywallKey('dialog', false));
  };

  const toggleFullscreen = () => {
    dispatch(setDesignSystemKey('fullScreen', !fullScreen));
  };

  if (!dialog) return null;

  return (
    <>
      <Dialog
        fullWidth
        fullScreen={isMobile || fullScreen}
        open={Boolean(dialog)}
        onClose={handleClose}
        maxWidth={'sm'}
      >
        <DialogTitle>
          <CardHeader
            action={
              <IconButton color="primary" onClick={toggleFullscreen}>
                <Icon icon="fullscreen" />
              </IconButton>
            }
          />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 2 }}>

            
            <Grid size={{ xs: 12 }}>
              {user ? <UserMenu /> : <SignIn /> }
            </Grid>  

            { user && <Grid size={{ xs: 12}}>
              <pre style={{ fontSize: '10px' }}>
                user: {JSON.stringify(user, null, 2)}
              </pre>
            </Grid>    }
                  
          </Grid>
        </DialogContent>
        <DialogActions>
          
          <IconButton color="primary" onClick={handleClose}>
            <Icon icon="close" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
