// core/gl-core/cartridges/DesignSystem/DesignSystem.tsx
'use client';
import * as React from 'react';
import { TTheme } from './types';
import { Box } from '@mui/material';
import { useDispatch, Icon, useIsMobile } from '../../../gl-core';
import { useDesignSystem, setDesignSystemKey } from '../DesignSystem';

export interface IDesignSystem {
  children: React.ReactNode;
}

export default function DesignSystem({ children = null }: IDesignSystem) {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const ds = useDesignSystem();
  const { theme } = ds;

  const example = () => {
    dispatch(
      setDesignSystemKey('dialog', {
        open: true,
        title: 'fuck',
        icon: 'case',
      }),
    );
    // dispatch(setDesignSystemKey('dialog', null));
  };

  const fakeData = {
    icon: 'star',
    title: 'This is the title',
    subheader: 'deafult subtitle',
    content: 'Can this be markdown?',
  };

  return (
    <>
      <Icon icon="design" />
      <pre>fakeData: {JSON.stringify(fakeData, null, 2)}</pre>
      {/* <pre>ds: {JSON.stringify(ds, null, 2)}</pre>
    <pre>theme: {JSON.stringify(theme, null, 2)}</pre> */}

      {children}
    </>
  );
}
