'use client';
// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/components/NewContent.tsx

import * as React from 'react';
import { TAuthForm } from '../../../../gl-core/types';
import { Fab } from '@mui/material';
import { useDispatch, Icon } from '../../../../gl-core';
import { setDesignSystemKey } from '../../DesignSystem';
import { useNewContent } from '../../Uberedux';

export default function NewContent({}: TAuthForm) {
  const dispatch = useDispatch();
  const newContent = useNewContent();

  // const openDesignSystem = () => {
  //   dispatch(
  //     setDesignSystemKey('dialog', {
  //       icon: 'fingerprint',
  //     }),
  //   );
  // };

  return (
    <>
      {/* <pre style={{ fontSize: '10px' }}>
        newContent: {JSON.stringify(newContent, null, 2)}
      </pre> */}
    </>
  );
}
