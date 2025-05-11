'use client';
import React from 'react';
import { Box, TextField } from '@mui/material';
import { useSlice, useDispatch } from '../../';
import { updateCVKey } from './';

const APPBAR_HEIGHT = 64;
const ESTIMATED_ROW_HEIGHT = 24;
const PADDING = 48;

export default function Job() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { cv } = slice;
  const { jd } = cv;

  const [minRows, setMinRows] = React.useState(10);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    const updateRows = () => {
      const availableHeight = window.innerHeight - APPBAR_HEIGHT - PADDING;
      const rows = Math.floor(availableHeight / ESTIMATED_ROW_HEIGHT);
      setMinRows(rows > 10 ? rows : 10);
    };

    updateRows();
    window.addEventListener('resize', updateRows);
    return () => window.removeEventListener('resize', updateRows);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000)

  }, [minRows]);

  return (
    <Box sx={{ px: 2, pt: 2 }}>
      <TextField
        fullWidth
        multiline
        color="secondary"
        rows={minRows}
        inputRef={inputRef}
        label="Paste Job Description"
        value={jd || ''}
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
