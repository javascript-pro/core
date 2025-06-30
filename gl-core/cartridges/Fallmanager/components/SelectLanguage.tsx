// core/gl-core/cartridges/Fallmanager/components/SelectLanguage.tsx
'use client';

import * as React from 'react';
import {
  Box,
  MenuItem,
  Select,
  ListItemIcon,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../Fallmanager';
import { TLanguageCode } from '../types';

type LanguageInfo = {
  title: string;
  description: string;
};

type FallmanagerState = {
  language: string;
  languages: Record<string, LanguageInfo>;
};

type RootState = {
  redux: {
    fallmanager: FallmanagerState;
  };
};

export default function SelectLang() {
  const dispatch = useDispatch();
  const { language, languages } = useSelector(
    (state: RootState) => state.redux.fallmanager
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(setLanguage(event.target.value as TLanguageCode));
  };

  return (
    <Box sx={{ display: 'inline-block', minWidth: 200 }}>
      <Select
        value={language}
        onChange={handleChange}
        variant="outlined"
        size="small"
        sx={{ minWidth: 180 }}
        renderValue={(selected) => {
          const lang = languages[selected as string];
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`/svg/flags/${selected}.svg`}
                alt={lang?.title || selected}
                style={{
                  width: 24,
                  height: 16,
                  marginRight: 8,
                  objectFit: 'contain',
                }}
              />
              {lang?.title || selected}
            </Box>
          );
        }}
      >
        {Object.entries(languages).map(([code, data]) => (
          <MenuItem key={code} value={code}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <img
                src={`/svg/flags/${code}.svg`}
                alt={data.title}
                style={{ width: 24, height: 16, objectFit: 'contain' }}
              />
            </ListItemIcon>
            <ListItemText primary={data.description} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
