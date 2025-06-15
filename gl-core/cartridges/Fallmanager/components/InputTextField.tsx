// core/gl-core/cartridges/Fallmanager/components/InputTextField.tsx
'use client';
import * as React from 'react';
import { Box, TextField } from '@mui/material';
import { CustomButton, Icon } from '../../Fallmanager';

export type TUploadField = {
  id?: string;
  label?: string;
  color?: string;
  helperText?: string;
  onChange?: () => void;
};

export default function InputTextField({
  id = 'input-text',
  label = 'Input Text',
  helperText = 'dlaishjdfilj',
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
      id={id}
      helperText={helperText}
      ref={inputRef}
      onChange={handleChange}
      onBlur={handleOnBlur}
    />
  );
}
