'use client';
import React from 'react';
import { Box, TextField } from '@mui/material';
import { useSlice, useDispatch } from '../../';
import { updateCVKey } from './';

export type TJob = {
  markdown?: string | null;
};

export default function Job({ markdown = null }: TJob) {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { cv } = slice;
  const { jd } = cv;

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={10}
        label="Paste Job Description"
        defaultValue={jd || ''}
        onChange={(e) => {
          dispatch(updateCVKey('cv', { jd: e.target.value }));
        }}
        onPaste={(e) => {
          const pasted = e.clipboardData.getData('text');
          dispatch(updateCVKey('cv', { jd: pasted }));
        }}
      />
    </Box>
  );
}
