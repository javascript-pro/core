// core/gl-core/cartridges/Fallmanager/components/AIAssisted.tsx
'use client';

import * as React from 'react';
import { useEffect } from 'react';
import {
  Dialog,
  CardHeader,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  useFallmanagerSlice,
  useLingua,
  toggleAICase,
} from '../../Fallmanager';
import { useDispatch, Icon } from '../../../../gl-core';

export default function AIAssisted() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { aiCase } = useFallmanagerSlice();

  useEffect(() => {}, [aiCase, dispatch]);

  const handleClose = () => {
    dispatch(toggleAICase(false));
  };

  const handleSubmit = () => {
    console.log('handleSubmit');
    // dispatch(saveNewCase(clientName.trim()));
  };

  if (!aiCase.open) return null;

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <CardHeader avatar={<Icon icon="aicase" />} title={t('NEW_AI_CASE')} />
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {t('NEW_CASE_HELP_AI')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={aiCase.saving}>
          {t('CANCEL') || 'Cancel'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/*
{aiCase.saving ? (
          <CircularProgress size={24} sx={{ ml: 2, mr: 1 }} />
        ) : (
          <Button
            variant="contained"
            
            onClick={handleSubmit}
          >
            {t('SUBMIT') || 'Submit'}
          </Button>
        )}

*/
