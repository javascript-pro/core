// core/gl-core/cartridges/DesignSystem/components/SystemDialog.tsx
'use client';
import * as React from 'react';
import {
  CardHeader,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../../gl-core';
import { useDesignSystem, setDesignSystemKey } from '../../DesignSystem';

export type TSystemDialog = {
  icon?: string;
  title?: string;
  subheader?: string;
  content?: React.ReactNode;    
}

export default function SystemDialog() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();



  const handleClose = () => {
    // dispatch(setDesignSystemKey('dialog', {open: true, title: 'fuck'}));
    dispatch(setDesignSystemKey('dialog', null));
  };

 
  const fakeData = {
    icon: "star",
    title: "This is the title",
    subheader: "deafult subtitle",
    content: "Can this be markdown?",

  }

  return (
    <>
      <Dialog
        fullScreen
        open={Boolean(ds)}
        onClose={handleClose}
        maxWidth={'md'}
        fullWidth
      >
        <DialogTitle>
          
          <CardHeader
            avatar={<Icon icon="home" />}
            title="System Dialog"
            subheader="Lorem Ipsum"
            action={'Exit'}
          />
          
        </DialogTitle>

        <DialogContent>
          content
        </DialogContent>

        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="primary" onClick={handleClose}>
            <Icon icon="close" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
