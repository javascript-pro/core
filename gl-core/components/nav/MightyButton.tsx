'use client';
import React from 'react';
import {
  Box,
  Button,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Icon } from '../../../gl-core';

export type TMightyButton = {
  mode?: 'button' | 'icon' | 'listitem' | 'noicon' | null;
  disabled?: boolean;
  label?: string | undefined;
  variant?: 'contained' | 'outlined' | 'text' | undefined;
  sx?: any;
  color?: any;
  icon?: string | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
};

export default function MightyButton({
  mode = 'button',
  disabled = false,
  color = 'primary',
  sx = null,
  icon = undefined,
  variant = undefined,
  label = 'No Label',
  fullWidth = false,
  onClick = () => {
    console.log('no onClick');
  },
}: TMightyButton) {
  if (mode === 'noicon') {
    return (
      <Button
        disabled={disabled}
        sx={sx}
        fullWidth={fullWidth}
        size="small"
        variant={variant}
        color={color}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }

  if (mode === 'listitem') {
    return (
      <ListItemButton disabled={disabled} onClick={onClick} sx={sx}>
        <ListItemIcon>
          <Icon icon={icon as any} />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    );
  }

  if (mode === 'icon') {
    return (
      
        <IconButton color="inherit" onClick={onClick} disabled={disabled}>
          <Icon icon={icon as any} />
        </IconButton>
        
    );
  }

  return (
    <Button
      disabled={disabled}
      sx={{ ...sx, boxShadow: 0 }}
      fullWidth={fullWidth}
      size="small"
      variant={variant}
      color={color}
      onClick={onClick}
    >
      <Box sx={{ mx: 1 }}>{label}</Box>
      <Box sx={{ pt: 0.5, ml: 1 }}>
        <Icon icon={icon as any} />
      </Box>
    </Button>
  );
}
