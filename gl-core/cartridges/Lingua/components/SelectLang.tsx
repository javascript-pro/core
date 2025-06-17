// core/gl-core/cartridges/Lingua/components/SelectLang.tsx
'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { TSelectLang } from '../types';

export default function SelectLang({ payload = null }: TSelectLang) {
  console.log('SelectLang', payload);

  return <Box sx={{ p: 1, border: '1px solid gold' }}>SelectLang</Box>;
}
