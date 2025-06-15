// core/gl-core/cartridges/Fallmanager/components/InputTextField.tsx
'use client';
import * as React from 'react';
import { Box, TextField } from '@mui/material';
import { CustomButton, Icon } from '../../Fallmanager';

export type TUploadField = {
  id?: string;
  label?: string;
  variant?: 'filled' | 'contained' | 'standard';
  autoFocus: boolean;
  error?: boolean | null;
  color?: string;
  helperText?: string | null;
  onChange?: () => void;
};

export default function InputTextField({
  id = 'input-text',
  error = null,
  autoFocus = false,
  variant = "standard",
  label = 'Input Text Field',
  helperText = null,
  onChange = () => {
    console.log('No onChange event set');
  },
}: TUploadField) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleOnBlur = () => {
    // inputRef.current?.click();
    console.log('handleOnBlur');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange', event.target.value);
  };

  return (
    <TextField
      fullWidth
      autoFocus={autoFocus}
      error={error as any}
      variant={variant as any}
      id={id}
      label={label}
      helperText={helperText}
      ref={inputRef}
      onChange={handleChange}
      onBlur={handleOnBlur}
    />
  );
}
