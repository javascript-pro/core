'use client';
import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../Fallmanager';
import { TIconNames } from '../components/Icon';

export type TCustomButton = {
  mode?: 'icon' | 'button' | null;
  disabled?: boolean;
  label?: string;
  variant?: 'contained' | 'outlined' | 'text';
  sx?: any;
  color?: any;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
};

export default function CustomButton({
  mode = 'icon',
  disabled = false,
  color = 'primary',
  sx = null,
  icon,
  iconPosition = 'left',
  variant,
  label = 'No Label',
  fullWidth = false,
  onClick = () => {
    console.log('no onClick');
  },
}: TCustomButton) {
  if (mode === 'icon') {
    return (
      <Tooltip title={label} enterTouchDelay={0} leaveTouchDelay={3000}>
        <IconButton color={color} onClick={onClick} disabled={disabled}>
          <Icon icon={icon as TIconNames} />
        </IconButton>
      </Tooltip>
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
      {icon && iconPosition === 'left' && (
        <Box sx={{ pt: 0.5, mr: 1 }}>
          <Icon icon={icon as TIconNames} />
        </Box>
      )}
      <Box sx={{ mx: 1 }}>{label}</Box>
      {icon && iconPosition === 'right' && (
        <Box sx={{ pt: 0.5, ml: 1 }}>
          <Icon icon={icon as TIconNames} />
        </Box>
      )}
    </Button>
  );
}
