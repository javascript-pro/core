'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Icon } from '../';
import { useKey } from '../../goldlabel/cartridges/Uberedux';

export type LightDarkToggleProps = {
  mode?: 'iconbutton' | 'listbutton';
};

export default function LightDarkToggle({ mode }: LightDarkToggleProps) {
  const router = useRouter();
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
    <Box>
      <Tooltip title={darkmode ? 'Light Mode' : 'Dark Mode'}>
        <IconButton
          onClick={() => {
            handleButtonClick({ action: 'TOGGLE_DARKMODE' });
          }}
        >
          <Icon icon={darkmode ? 'lightmode' : 'darkmode'} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

/*
<ListItemButton
              onClick={() => handleButtonClick({ route: '/uberedux' })}
            >
              <ListItemIcon>
                <Icon icon="uberedux" />
              </ListItemIcon>
              <ListItemText primary="Uberedux" />
            </ListItemButton>
*/
