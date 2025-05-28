'use client';
import React from 'react';
import { Box } from '@mui/material';
import { useSlice } from '../../../../gl-core';

export default function ShowPrompt() {
  const slice = useSlice();
  const { cv } = slice;
  const { jd } = cv;

  const promptStr = `
    ${jd}
  `;

  return (
    <Box sx={{}}>
      {promptStr}
      {/* <pre>promptStr: {JSON.stringify(promptStr, null, 2)}</pre> */}
    </Box>
  );
}
