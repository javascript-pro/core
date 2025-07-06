'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import {
  ButtonBase,
  Box,
  Dialog,
  CardHeader,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  LinearProgress,
  Stack,
} from '@mui/material';
import { useFallmanagerSlice, useLingua } from '../../Fallmanager';
import {
  useDispatch,
  Icon,
  MightyButton,
  toggleFeedback,
} from '../../../../gl-core';

export default function AIAssisted() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { aiCase } = useFallmanagerSlice();

  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>
        <CardHeader avatar={<Icon icon="aicase" />} title={t('NEW_AI_CASE')} />
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2">{t('NEW_CASE_HELP_AI')}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button>{t('CANCEL')}</Button>
      </DialogActions>
    </Dialog>
  );
}
