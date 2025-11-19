// core/gl-core/cartridges/DesignSystem/DesignSystem.tsx
'use client';
import * as React from 'react';
import { TTheme, IDesignSystem } from './types';
import { ThemeProvider, CssBaseline, Fab } from '@mui/material';
import { useDispatch, Icon } from '../../../gl-core';
import { setDesignSystemKey, useMUITheme, SystemDialog } from '../DesignSystem';

export default function DesignSystem({
  theme,
  children = null,
}: IDesignSystem) {
  const dispatch = useDispatch();

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
