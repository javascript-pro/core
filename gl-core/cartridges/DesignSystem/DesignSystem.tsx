// core/gl-core/cartridges/DesignSystem/DesignSystem.tsx
'use client';
import * as React from 'react';
import { Fab } from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../gl-core';
import { useDesignSystem, setDesignSystemKey, SystemDialog } from '../DesignSystem';

export interface IDesignSystem {
  children: React.ReactNode;
}

export default function DesignSystem({ children = null }: IDesignSystem) {
  const dispatch = useDispatch();
  const ds = useDesignSystem();

  const example = () => {
    dispatch(
      setDesignSystemKey('dialog', {
        title: 'fuck',
        icon: 'case',
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
        onClick={example}
      >
        <Icon icon="fingerprint" />
      </Fab>
    </>
  );
}
