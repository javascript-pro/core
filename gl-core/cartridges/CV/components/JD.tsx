'use client';
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSlice, useDispatch } from '../../../';
import { updateCVKey } from '../';

const MIN_LENGTH = 100;

export default function JD() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { cv } = slice;
  const { jd, validJd } = cv;

  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
  }, []);

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
    e.preventDefault();
  };

  const handleClear = () => {
    dispatch(updateCVKey('cv', { jd: '', validJd: false }));
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant='h5' gutterBottom>
        Job Description
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Try our Job Fit AI — powered by a Large Language Model — to see how well we match a specific role. Paste in a job description and get an instant assessment.
      </Typography>

      <TextField
        sx={{ mb: 2 }}
        fullWidth
        multiline
        variant='filled'
        color="secondary"
        rows={3}
        inputRef={inputRef}
        label="Paste Job Description here"
        value={jd || ''}
        helperText={
          validJd === false
            ? `Must be at least ${MIN_LENGTH} characters`
            : ''
        }
        onChange={handleChange}
        onPaste={handlePaste}
        InputProps={{
          endAdornment: jd ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
                aria-label="Clear job description"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      {validJd && (
        <Typography variant="body2" color="success.main">
          Ready to send.
        </Typography>
      )}
    </Box>
  );
}
