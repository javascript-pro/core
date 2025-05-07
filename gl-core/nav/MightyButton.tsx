'use client';
import React from 'react';
import { 
  Box,
  Button,
} from '@mui/material';
import { 
  Icon,
} from '../';

export type TMightyButton = {
  label?: string | undefined;
  variant?: "contained" | "outlined" | "text" | undefined;
  color?: any;
  icon?: string | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
}

export default function MightyButton({
  color = "primary",
  icon = undefined,
  variant = undefined,
  label = "No Label",
  fullWidth = false,
  onClick = () => {
    console.log("no onClick")
  }
}: TMightyButton) {
  
  return <Button 
            fullWidth={fullWidth}
            size="small"
            variant={variant}
            color={color}
            onClick={onClick}
          >
            <Box sx={{pt: 0.5, mr: 1}}>
              <Icon icon={icon as any} />
            </Box>
            <Box sx={{mx:1}}>
              {label}
            </Box>
          </Button>
};
