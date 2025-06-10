'use client';
import React from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  FormLabel,
  useTheme,
  Typography,
} from '@mui/material';
import {
  useSlice,
  useIsMobile,
  useDispatch,
  Icon,
  MightyButton,
} from '../../../../gl-core';
import { updateCVKey, createPrompt, setCVKey } from '../';

const MIN_LENGTH = 100;

export default function JD() {
  const dispatch = useDispatch();
  const slice = useSlice();
  const isMobile = useIsMobile();
  const { cv } = slice;
  const { jd, validJd, viewpoint } = cv;
  const linkCol = useTheme().palette.text.primary;

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

  const onAnalyse = () => {
    dispatch(createPrompt());
    dispatch(setCVKey('appMode', 'completion'));
  };

  return (
    <Box sx={{ py: 0 }}>
      <RadioGroup
        row
        value={viewpoint}
        onChange={handleViewpointChange}
        sx={{ my: 2 }}
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
        sx={{ mb: 4 }}
        fullWidth
        multiline
        variant="filled"
        rows={isMobile ? 6 : 10}
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
              onAnalyse();
            }}
            label="Analyse"
            icon="openai"
            color="primary"
            variant="outlined"
          />
        </>
      )}

      <Typography>
        Paste a job description and tap “Analyse”. Our AI will assess how well
        it matches the skills and experience in our CV, from either a 1st or 3rd
        party perspective. Try it out with one of these example jobs — one’s a{' '}
        <a
          href="/txt/goodFit.txt"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: linkCol, fontWeight: 'bold' }}
        >
          good fit
        </a>
        , the other{' '}
        <a
          href="/txt/badFit.txt"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: linkCol, fontWeight: 'bold' }}
        >
          isn’t
        </a>
        .
      </Typography>
    </Box>
  );
}
