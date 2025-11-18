// core/gl-core/cartridges/DesignSystem/DesignSystem.tsx
'use client';
import * as React from 'react';
import { Fab } from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../gl-core';
import {
  useDesignSystem,
  setDesignSystemKey,
  SystemDialog,
} from '../DesignSystem';

export interface IDesignSystem {
  children: React.ReactNode;
}

export default function DesignSystem({ children = null }: IDesignSystem) {
  const dispatch = useDispatch();
  const ds = useDesignSystem();

  const openDesignSystem = () => {
    dispatch(
      setDesignSystemKey('dialog', {
        title: 'Thumb Menu',
        icon: 'fingerprint',
      }),
    );
  };

  return (
    <>
      {children}
      <SystemDialog />
      <Fab
        color="primary"
        sx={{
          zIndex: (theme) => theme.zIndex.modal - 2,
          position: 'fixed',
          bottom: 8,
          right: 8,
        }}
        onClick={openDesignSystem}
      >
        <Icon icon="fingerprint" />
      </Fab>
    </>
  );
}
