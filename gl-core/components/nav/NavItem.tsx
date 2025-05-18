'use client';

import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Icon } from '../../../gl-core';

export type TNavItem = {
  label?: string | null;
  sublabel?: string | null;
  icon?: string | null;
  onClick?: () => void;
  options?: any;
};

export default function NavItem({
  label = null,
  sublabel = null,
  icon = null,
  onClick = () => console.log('no onclick set'),
}: TNavItem) {
  return (
    <>
      <ListItemButton onClick={onClick}>
        {icon && (
          <ListItemIcon>
            <Icon icon={icon as any} />
          </ListItemIcon>
        )}
        <ListItemText primary={label} secondary={sublabel} />
      </ListItemButton>
    </>
  );
}
