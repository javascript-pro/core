'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { Icon } from '../../';

export type TFlash = {
  id?: string | null;
};

export default function Flash({ id = null }: TFlash) {
  return (
    <Box>
      Flash <Icon icon="flash" />
    </Box>
  );
}
