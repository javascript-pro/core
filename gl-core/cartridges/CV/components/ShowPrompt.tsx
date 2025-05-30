'use client';
import React from 'react';
import { Box } from '@mui/material';
import { useSlice } from '../../../../gl-core';

export default function ShowPrompt() {
  const slice = useSlice();
  const { prompt } = slice.cv;
  
  return (
    <Box sx={{}}>
      {prompt}
    </Box>
  );
}
