// core/gl-core/cartridges/Fallmanager/components/CustomButton.tsx
'use client';
import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Icon } from '../../Fallmanager';

export type TCustomButton = {
  mode?: 'icon' | null;
  disabled?: boolean;
  label?: string | undefined;
  variant?: 'contained' | 'outlined' | 'text' | undefined;
  sx?: any;
  color?: any;
  icon?: string | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
};

export default function CustomButton({
  mode = null,
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
}: TCustomButton) {

  if (mode === 'icon') {
    return (
      <Tooltip title={label} enterTouchDelay={0} leaveTouchDelay={3000}>
        <IconButton color="inherit" onClick={onClick} disabled={disabled}>
          <Icon icon={icon as any} />
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
      <Box sx={{ mx: 1 }}>{label}</Box>
      <Box sx={{ pt: 0.5, ml: 1 }}>
        <Icon icon={icon as any} />
      </Box>
    </Button>
  );
}
