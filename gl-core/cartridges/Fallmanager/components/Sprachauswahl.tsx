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
import { setzeSprache, zuruecksetzen } from '../../Fallmanager'; // <-- Add resetTranslations
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

export default function Sprachauswahl() {
  const dispatch = useDispatch();
  const { language, languages } = useSelector(
    (state: RootState) => state.redux.fallmanager,
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(setzeSprache(event.target.value as TLanguageCode));
  };

  return (
    <Select
      value={language}
      onChange={handleChange}
      variant="standard"
      disableUnderline
      renderValue={(selected) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`/svg/flags/${selected}.svg`}
              style={{
                width: 32,
                height: 32,
                marginLeft: 16,
                marginRight: 16,
                objectFit: 'contain',
              }}
            />
          </Box>
        );
      }}
    >
      {/* Current language shown as disabled item */}
      <MenuItem sx={{ display: 'none' }} value={language} disabled>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <img
            src={`/svg/flags/${language}.svg`}
            style={{ width: 32, height: 32, objectFit: 'contain' }}
          />
        </ListItemIcon>
        {/* <ListItemText primary={languages[language].title} /> */}
      </MenuItem>

      {/* Other available languages */}
      {Object.entries(languages)
        .filter(([code]) => code !== language)
        .map(([code, data]) => (
          <MenuItem key={code} value={code}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <img
                src={`/svg/flags/${code}.svg`}
                alt={data.title}
                style={{
                  width: 32,
                  height: 32,
                  marginRight: 16,
                  objectFit: 'contain',
                }}
              />
            </ListItemIcon>
            <ListItemText primary={data.title} />
          </MenuItem>
        ))}
    </Select>
  );
}
