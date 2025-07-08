// core/gl-core/cartridges/Fallmanager/components/SwitchLang.tsx
'use client';

import * as React from 'react';
import { Box, Avatar, IconButton, Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFallmanagerSlice, setzeSprache } from '../../Fallmanager';
import { TLanguageCode } from '../types';

export default function SwitchLang() {
  const dispatch = useDispatch();
  const { language } = useFallmanagerSlice();
  const isGerman = language === 'de';

  const setLanguage = (lang: TLanguageCode) => {
    if (lang !== language) {
      dispatch(setzeSprache(lang));
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={() => setLanguage('en')}
      >
        <Avatar
          src="/svg/flags/en.svg"
          alt="English"
          sx={{ width: 24, height: 24 }}
        />
      </IconButton>

      <Switch
        checked={isGerman}
        onChange={(_, checked) => setLanguage(checked ? 'de' : 'en')}
        inputProps={{ 'aria-label': 'Language switch' }}
        color="primary"
      />

      <IconButton
        onClick={() => setLanguage('de')}
      >
        <Avatar
          src="/svg/flags/de.svg"
          alt="Deutsch"
          sx={{ width: 24, height: 24 }}
        />
      </IconButton>
    </Box>
  );
}
