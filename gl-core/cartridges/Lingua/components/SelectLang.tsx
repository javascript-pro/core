// /Users/goldlabel/GitHub/core/gl-core/cartridges/Lingua/components/SelectLang.tsx
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

type LangData = {
  default: string;
  local: string;
  switch: string;
};

type LinguaState = {
  cartridge: string;
  lang: string;
  langs: Record<string, LangData>;
};

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
        variant="standard"
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
                  height: 24,
                  marginRight: 10,
                  objectFit: 'contain',
                }}
              />
              {lang?.local || (selected as string)}
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
                style={{ width: 24, height: 24, objectFit: 'contain' }}
              />
            </ListItemIcon>
            <ListItemText primary={data.local} secondary={data.switch} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
