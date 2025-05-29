'use client';
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  FormLabel,
} from '@mui/material';
import { useSlice, useDispatch, Icon, MightyButton } from '../../../../gl-core';
import { updateCVKey } from '../';

const MIN_LENGTH = 100;

export default function JD() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { cv } = slice;
  const { jd, validJd, viewpoint } = cv;

  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
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

  const handleViewpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCVKey('cv', { viewpoint: e.target.value }));
  };

  const handlePrompt = () => {
    dispatch(updateCVKey('cv', { appMode: 'prompt' }));
  };

  return (
    <Box sx={{ py: 2 }}>
      {/* <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        Job Description
      </Typography> */}

          <FormLabel component="legend" sx={{ mt: 3 }}>
            Point of View
          </FormLabel>

          <RadioGroup
            row
            value={viewpoint}
            onChange={handleViewpointChange}
            sx={{ mb: 3 }}
          >
            <FormControlLabel
              value="first"
              control={<Radio />}
              label="1st person (I am...)"
            />
            <FormControlLabel
              value="third"
              control={<Radio />}
              label="3rd person (The candidate is...)"
            />
          </RadioGroup>


      <TextField
        sx={{ mb: 2 }}
        fullWidth
        multiline
        variant="filled"
        color="secondary"
        rows={2}
        inputRef={inputRef}
        label="Paste Job Description here"
        value={jd || ''}
        helperText={
          validJd === false ? `Must be at least ${MIN_LENGTH} characters` : ''
        }
        onChange={handleChange}
        onPaste={handlePaste}
        InputProps={{
          endAdornment: jd ? (
            <InputAdornment position="end">
              <Tooltip title="Reset Job">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  aria-label="Clear job description"
                >
                  <Icon icon="close" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ) : null,
        }}
      />

      {validJd && (
        <>
          <MightyButton
            onClick={() => {
              handlePrompt();
            }}
            label="Analyse Job Fit"
            icon="openai"
            color="primary"
            variant="contained"
          />
        </>
      )}
    </Box>
  );
}
