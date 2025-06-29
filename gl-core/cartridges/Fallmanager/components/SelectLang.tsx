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
import { setLang } from '../../Lingua/actions/setLang';

// Replace this import with your actual RootState type if available
type LangData = {
  default: string;
  local: string;
};
type LinguaState = {
  cartridge: string;
  lang: string;
  langs: Record<string, LangData>;
};
// If you have RootState defined in your app, import it and replace 'any' below!
type RootState = {
  redux: {
    lingua: LinguaState;
  };
};

export default function SelectLang() {
  const dispatch = useDispatch();
  const lingua = useSelector((state: RootState) => state.redux.lingua);

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(setLang(event.target.value));
  };

  return (
    <Box sx={{ display: 'inline-block', minWidth: 200 }}>
      <Select
        value={lingua.lang}
        onChange={handleChange}
        variant="outlined"
        size="small"
        sx={{ minWidth: 180 }}
        renderValue={(selected) => {
          const lang = lingua.langs[selected as string];
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`/svg/flags/${selected}.svg`}
                alt={lang?.default || (selected as string)}
                style={{
                  width: 24,
                  height: 16,
                  marginRight: 8,
                  objectFit: 'contain',
                }}
              />
              {lang?.default || (selected as string)}
            </Box>
          );
        }}
      >
        {Object.entries(lingua.langs).map(([code, data]) => (
          <MenuItem key={code} value={code}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <img
                src={`/svg/flags/${code}.svg`}
                alt={data.default}
                style={{ width: 24, height: 16, objectFit: 'contain' }}
              />
            </ListItemIcon>
            <ListItemText primary={data.default} secondary={data.local} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
