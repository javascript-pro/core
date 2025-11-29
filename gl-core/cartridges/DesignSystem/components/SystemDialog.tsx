// core/gl-core/cartridges/DesignSystem/components/SystemDialog.tsx
'use client';
import * as React from 'react';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useDispatch, useIsMobile, Icon } from '../../../../gl-core';
import {
  useDesignSystem,
  setDesignSystemKey,
  MenuSystem,
  NewContent,
} from '../../DesignSystem';
import { useNewContent } from '../../Uberedux';
import { User, SignIn, useUser } from '../../Paywall';

export default function SystemDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();
  const newContent = useNewContent();
  const { fullScreen } = ds;
  const user = useUser();

  const handleClose = () => {
    dispatch(setDesignSystemKey('dialog', null));
  };

  const toggleFullscreen = () => {
    dispatch(setDesignSystemKey('fullScreen', !fullScreen));
  };

  if (!ds.dialog) return null;

  return (
    <>
      <Dialog
        fullWidth
        fullScreen={isMobile || fullScreen}
        open={Boolean(ds.dialog)}
        onClose={handleClose}
        maxWidth={'sm'}
      >
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                New Content
              </Typography>
              {newContent?.map((item: any, i: number) => (
                <NewContent key={`content_${i}`} slug={item.slug} />
              ))}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <MenuSystem />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" onClick={toggleFullscreen}>
            <Icon icon="fullscreen" />
          </IconButton>
          <IconButton color="primary" onClick={handleClose}>
            <Icon icon="close" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
