'use client';
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../';
import { useKey } from '../../cartridges/Uberedux';

export type INavButton = {
  mode: 'icon' | 'list';
  icon: string;
};

export default function NavButton({
  mode = 'icon',
  icon = 'settings',
}: INavButton) {
  console.log('NavButton', mode);
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
