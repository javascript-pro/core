'use client';
// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/components/PushButton.tsx

import * as React from 'react';
import { TAuthForm } from '../../../../gl-core/types';
import { Fab } from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { setDesignSystemKey } from '../../DesignSystem';

export default function PushButton({}: TAuthForm) {
  const dispatch = useDispatch();
  const openDesignSystem = () => {
    dispatch(
      setDesignSystemKey('dialog', {
        icon: 'fingerprint',
      }),
    );
  };

  return (
    <Fab
      color="primary"
      sx={{
        zIndex: (theme) => theme.zIndex.modal - 2,
        boxShadow: 0,
        position: 'fixed',
        bottom: 8,
        right: 8,
      }}
      onClick={openDesignSystem}
    >
      <Icon icon="fingerprint" />
    </Fab>
  );
}
