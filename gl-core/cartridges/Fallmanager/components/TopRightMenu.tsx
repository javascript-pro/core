'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Icon, useDispatch } from '../../../../gl-core';
import {
  SwitchLang,
  useLingua,
  resetFallmanager,
  setThemeMode,
  useFallmanagerSlice,
} from '../../Fallmanager';

export default function TopRightMenu() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { themeMode } = useFallmanagerSlice();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReset = () => {
    dispatch(resetFallmanager());
    handleMenuClose();
  };

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    dispatch(setThemeMode(newMode));
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Icon icon="menu" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <SwitchLang />
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push('/');
          }}
        >
          <ListItemIcon>
            <Icon icon="blokey" />
          </ListItemIcon>
          <ListItemText>{t('GOLDLABEL_HOME')}</ListItemText>
        </MenuItem>

        <MenuItem onClick={toggleThemeMode}>
          <ListItemIcon>
            <Icon icon={themeMode === 'light' ? 'darkmode' : 'lightmode'} />
          </ListItemIcon>
          <ListItemText>
            {themeMode === 'light' ? t('DARK_MODE') : t('LIGHT_MODE')}
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleReset}>
          <ListItemIcon>
            <Icon icon="reset" />
          </ListItemIcon>
          <ListItemText>{t('RESET')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
