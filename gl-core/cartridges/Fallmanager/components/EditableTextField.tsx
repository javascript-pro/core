// core/gl-core/cartridges/Fallmanager/components/EditableTextField.tsx
'use client';
import * as React from 'react';
import { TextField } from '@mui/material';

export type TEditableTextField = {
  id?: string;
  label?: string;
  value?: string;
  variant?: 'filled' | 'contained' | 'standard';
  autoFocus?: boolean;
  error?: boolean | null;
  color?: string;
  helperText?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function EditableTextField({
  id = 'input-text',
  label = 'Input Text Field',
  value = '',
  variant = 'standard',
  autoFocus = false,
  error = null,
  color,
  helperText = null,
  onChange = () => {
    console.log('No onChange handler set');
  },
  onBlur = () => {},
  onKeyDown,
}: TEditableTextField) {
  
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      value={value}
      autoFocus={autoFocus}
      error={Boolean(error)}
      helperText={helperText}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      inputRef={inputRef}
    />
  );
}
