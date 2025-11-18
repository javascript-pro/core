// core/gl-core/cartridges/DesignSystem/DesignSystem.tsx
'use client';
import * as React from 'react';
import { TTheme } from './types';
import { ThemeProvider, CssBaseline, Fab } from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../gl-core';
import {
  useDesignSystem,
  setDesignSystemKey,
  useMUITheme,
  SystemDialog,
} from '../DesignSystem';

export interface IDesignSystem {
  theme?: TTheme;
  children: React.ReactNode;
}

export default function DesignSystem({
  theme,
  children = null,
}: IDesignSystem) {
  const dispatch = useDispatch();
  const ds = useDesignSystem();

  const openDesignSystem = () => {
    dispatch(
      setDesignSystemKey('dialog', {
        icon: 'fingerprint',
      }),
    );
  };

  const newtheme = useMUITheme(theme as TTheme);

  return (
    <ThemeProvider theme={newtheme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}
