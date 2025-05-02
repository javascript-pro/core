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
  type?: "auto";
  label?: string | undefined;
  variant?: "contained" | "outlined" | "text" | undefined;
  color?: any;
  icon?: string | undefined;
  onClick?: () => void;
}

export default function MightyButton({
  type = "auto",
  color = "primary",
  icon = undefined,
  variant = undefined,
  label = "No Label",
  onClick = () => {
    console.log("no onClick")
  }
}: TMightyButton) {
  
  if (type === "auto" ){
    return <Button 
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
  }
  return null
};
