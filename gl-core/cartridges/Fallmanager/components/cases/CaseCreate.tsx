'use client';
import * as React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  CardHeader,
  IconButton,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { useIsMobile, useDispatch } from '../../../../../gl-core';
import {
  Icon,
  CustomButton,
  toggleNewCaseOpen,
  useNewCaseOpen,
  InputTextField,
  newCase,
} from '../../../Fallmanager';

function generateSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function CaseCreate() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const newCaseOpen = useNewCaseOpen();

  const [party1, setParty1] = React.useState('');
  const [party2, setParty2] = React.useState('');
  const [touched, setTouched] = React.useState(false);

  const isValid = party1.trim().length >= 3 && party2.trim().length >= 3;

  const handleParty1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParty1(e.target.value);
  };

  const handleParty2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParty2(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isValid) {
        handleOpenNewCase();
      } else {
        setTouched(true);
      }
    }
  };

  const handleOpenNewCase = async () => {
    if (!isValid) return;

    const caseName = `${party1.trim()} versus ${party2.trim()}`;
    const slug = generateSlug(caseName);

    await dispatch(
      newCase({
        party1: party1.trim(),
        party2: party2.trim(),
        caseName,
        slug,
      }),
    );

    handleClose();
  };

  const handleClose = () => {
    dispatch(toggleNewCaseOpen(false));
    setParty1('');
    setParty2('');
    setTouched(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={isMobile}
      open={newCaseOpen}
      onClose={handleClose}
    >
      <DialogTitle>
        <CardHeader
          title="New case"
          avatar={<Icon icon="case" />}
          action={
            <IconButton onClick={handleClose}>
              <Icon icon="close" />
            </IconButton>
          }
        />
      </DialogTitle>

      <DialogContent>
        <Typography>
          To create a new case, enter the names of both parties. The case name
          will be generated automatically.
        </Typography>

        <Box sx={{ my: 2 }}>
          <InputTextField
            value={party1}
            autoFocus
            variant="filled"
            id="create-case-party1"
            label="Party 1"
            helperText={
              touched && party1.trim().length < 3
                ? 'Must be at least 3 characters'
                : 'e.g. Herr Peter Schmidt'
            }
            onChange={handleParty1Change}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </Box>

        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" color="textSecondary">
            versus
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <InputTextField
            value={party2}
            variant="filled"
            id="create-case-party2"
            label="Party 2"
            helperText={
              touched && party2.trim().length < 3
                ? 'Must be at least 3 characters'
                : 'e.g. Allianz Versicherung'
            }
            onChange={handleParty2Change}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <CustomButton
          disabled={!isValid}
          mode="button"
          icon="save"
          onClick={handleOpenNewCase}
          label="Save"
          variant="contained"
        />
      </DialogActions>
    </Dialog>
  );
}
