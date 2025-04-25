'use client';
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../';

export type INavButton = {
  mode: 'icon' | 'list';
  icon: string;
  title: string;
  onClick: () => void;
};

export default function NavButton({
  mode = 'icon',
  icon = 'settings',
  title = 'Title',
  onClick,
}: INavButton) {
  // console.log('NavButton', mode, icon, title);
  if (mode === 'icon') {
    return (
      <Tooltip title={title}>
        <IconButton onClick={onClick}>
          <Icon icon={icon as any} />
        </IconButton>
      </Tooltip>
    );
  }
  return null;
}
