'use client';
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../';
import { useKey } from '../../../gl-core/cartridges/Uberedux';
export type ILightDarkToggle = {
  mode?: 'iconbutton' | 'listbutton';
};

export default function LightDarkToggle({ mode }: ILightDarkToggle) {
  const [darkmode, setDarkmode] = useKey('darkmode');

  const handleButtonClick = (clickObj: { route?: string; action?: string }) => {
    if (clickObj.action) {
      switch (clickObj.action) {
        case 'TOGGLE_DARKMODE':
          setDarkmode(!darkmode);
          break;
      }
    }
  };

  return (
    <Tooltip title={darkmode ? 'Light Mode' : 'Dark Mode'}>
      <IconButton
        onClick={() => {
          handleButtonClick({ action: 'TOGGLE_DARKMODE' });
        }}
      >
        <Icon icon={darkmode ? 'lightmode' : 'darkmode'} />
      </IconButton>
    </Tooltip>
  );
}
