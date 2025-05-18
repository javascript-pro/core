'use client';

import * as React from 'react';
import { Box, Avatar, IconButton } from '@mui/material';
import {
  Icon,
} from '../../../../gl-core'
export type TTestClip = {
  slug: string | null;
};

export default function TestClip({ slug = null }: TTestClip) {
  
  const onTestClick = () => {
    return null
  }
  
  return (
    <Box sx={{
      m:2,
    }}>
      <IconButton>
        <Icon icon="flash" />
      </IconButton>
    </Box>
  );
}
