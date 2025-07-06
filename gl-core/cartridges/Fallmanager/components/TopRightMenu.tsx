'use client';

import * as React from 'react';
import moment from 'moment';
import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Icon, useDispatch, routeTo, MightyButton } from '../../../../gl-core';
import {
  useFallmanagerSlice,
  Sprachauswahl,
  useLingua,
  resetFallmanager,
} from '../../Fallmanager';

export default function TopRightMenu() {
  const dispatch = useDispatch();
  const t = useLingua();

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
        <MenuItem onClick={handleReset}>
          <ListItemIcon>
            <Icon icon="reset" />
          </ListItemIcon>
          <ListItemText>{t('RESET')}</ListItemText>
        </MenuItem>

        <MenuItem>
          <Box sx={{ width: 200 }}>
            <Sprachauswahl />
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
}
