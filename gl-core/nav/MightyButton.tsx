'use client';
import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Icon, useIsMobile } from '../';

export type TMightyButton = {
  mode?: 'button' | 'icon' | null;
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
  if (mode === 'icon') {
    return (
      <Tooltip title={label} enterTouchDelay={0} leaveTouchDelay={3000}>
        <IconButton color="inherit" onClick={onClick}>
          <Icon icon={icon as any} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      sx={sx}
      fullWidth={fullWidth}
      size="small"
      variant={variant}
      color={color}
      onClick={onClick}
    >
      <Box sx={{ pt: 0.5, mr: 1 }}>
        <Icon icon={icon as any} />
      </Box>
      <Box sx={{ mx: 1 }}>{label}</Box>
    </Button>
  );
}
