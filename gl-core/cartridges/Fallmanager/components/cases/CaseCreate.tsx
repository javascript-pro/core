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

export default function CaseCreate() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const newCaseOpen = useNewCaseOpen();

  const [clientName, setClientName] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const validate = (value: string) => {
    setIsValid(value.trim().length >= 6);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClientName(value);
    validate(value);
  };

  const handleBlur = () => {
    setTouched(true);
    validate(clientName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isValid) {
        handleOpenNewCase();
      } else {
        setTouched(true); // show validation message
      }
    }
  };

  const handleOpenNewCase = async () => {
    if (!isValid) return;
    await dispatch(newCase({ clientName }));
    handleClose(); // Reset UI after case creation
  };

  const handleClose = () => {
    dispatch(toggleNewCaseOpen(false));
    setClientName('');
    setIsValid(false);
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
          What information do we need to open a new case? Start with the name of
          the client, Joe Bloggs
        </Typography>
        <Box sx={{ my: 2 }}>
          <InputTextField
            value={clientName}
            autoFocus
            variant="filled"
            id="create-case-client-name"
            label="Client Name"
            helperText={
              touched && !isValid
                ? 'Client name must be at least 6 characters'
                : 'eg: Peter Schmidt'
            }
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={touched && !isValid}
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
