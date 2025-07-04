'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  useFallmanagerSlice,
  useLingua,
  toggleNewCase,
  saveNewCase,
} from '../../Fallmanager';
import { useDispatch } from '../../../../gl-core';

export default function NewCase() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { newCase } = useFallmanagerSlice();
  const [clientName, setClientName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef(clientName);

  const isValid = clientName.trim().length >= 6;

  // Keep latest clientName in ref
  useEffect(() => {
    nameRef.current = clientName;
  }, [clientName]);

  // Handle focusing and keydown when dialog opens
  useEffect(() => {
    if (newCase.open) {
      const timer = setInterval(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          clearInterval(timer);
        }
      }, 333);

      const handleKeyDown = (e: KeyboardEvent) => {
        const name = nameRef.current.trim();
        const isValidNow = name.length >= 6;

        if (e.key === 'Escape') {
          inputRef.current?.blur();
        }
        if (e.key === 'Enter' && isValidNow && !newCase.saving) {
          dispatch(saveNewCase(name));
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setClientName('');
    }
  }, [newCase.open, newCase.saving, dispatch]);

  // Close dialog after successful save
  useEffect(() => {
    if (newCase.id && newCase.saving === false) {
      dispatch(toggleNewCase(false));
    }
  }, [newCase.id, newCase.saving, dispatch]);

  const handleClose = () => {
    dispatch(toggleNewCase(false));
  };

  const handleSubmit = () => {
    if (!isValid || newCase.saving) return;
    dispatch(saveNewCase(clientName.trim()));
  };

  if (!newCase.open) return null;

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('NEW_CASE')}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {t('NEW_CASE_HELP_MANUAL')}
        </Typography>
        <TextField
          inputRef={inputRef}
          sx={{ mt: 2 }}
          label={t('CLIENT_NAME')}
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          fullWidth
          disabled={newCase.saving}
          error={clientName.length > 0 && !isValid}
          helperText={
            clientName.length > 0 && !isValid
              ? t('CLIENT_NAME_TOO_SHORT') || 'Must be at least 6 characters'
              : ' '
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={newCase.saving}>
          {t('CANCEL') || 'Cancel'}
        </Button>
        {newCase.saving ? (
          <CircularProgress size={24} sx={{ ml: 2, mr: 1 }} />
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {t('SUBMIT') || 'Submit'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
