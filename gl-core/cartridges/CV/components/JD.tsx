'use client';
import React from 'react';
import { Box, TextField } from '@mui/material';
import { useSlice, useDispatch } from '../../../';
import { updateCVKey } from '../';

const APPBAR_HEIGHT = 64;
const ESTIMATED_ROW_HEIGHT = 24;
const PADDING = 48;
const MIN_LENGTH = 100;

export default function JD() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { cv } = slice;
  const { jd, validJd } = cv;

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
    }, 1000);
  }, [minRows]);

  const validateJD = (text: string) => {
    const isValid = text.length >= MIN_LENGTH;
    dispatch(updateCVKey('cv', { validJd: isValid }));
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateCVKey('cv', { jd: value }));
    validateJD(value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pasted = e.clipboardData.getData('text');
    dispatch(updateCVKey('cv', { jd: pasted }));
    validateJD(pasted);
    e.preventDefault(); // Prevent double-paste issue
  };

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
        // error={validJd === false}
        helperText={
          validJd === false
            ? `Job descriptions must be at least ${MIN_LENGTH} characters`
            : ''
        }
        onChange={handleChange}
        onPaste={handlePaste}
      />
    </Box>
  );
}
