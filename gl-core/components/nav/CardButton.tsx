'use client';
import React from 'react';
import { Box, ButtonBase, Card } from '@mui/material';

export type TCardButton = {
  children?: React.ReactNode;
  disabled?: boolean;
  sx?: any;
  onClick?: () => void;
};

export default function CardButton({
  children = null,
  disabled = false,
  sx = null,
  onClick = () => {
    console.log('no CardButton onClick');
  },
}: TCardButton) {
  if (!children) return null;

  return (
    <Box
      sx={{
        ...sx,
        display: 'block',
        // border: "1px solid orange",
        // background: 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <ButtonBase
        disabled={disabled}
        onClick={onClick}
        sx={{
          // border: "1px solid red",
          width: '100%',
          height: '100%',
          textAlign: 'left',
        }}
      >
        {children}
      </ButtonBase>
    </Box>
  );
}
