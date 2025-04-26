'use client';
import React from 'react';
import { IconButton, Tooltip, Menu } from '@mui/material';
import { Icon } from '../../';

export type IMobileMenu = {
  title?: string;
  icon?: string;
  children: React.ReactNode;
};

export default function MobileMenu({
  title = 'Default',
  icon = 'menu',
  children = null,
}: IMobileMenu) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {children}
      </Menu>

      <Tooltip title={title}>
        <IconButton onClick={handleClick}>
          <Icon icon={icon as any} />
        </IconButton>
      </Tooltip>
    </>
  );
}
