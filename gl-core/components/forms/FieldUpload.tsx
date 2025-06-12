// core/gl-core/components/FieldUpload.tsx
'use client';
import * as React from 'react';
import { Box, Button } from '@mui/material';

export type TFieldUpload = {
  id?: string;
  label?: string;
  color?: string;
  accept?: string;
  multiple?: boolean;
  onSelect?: (file: File | null) => void;
};

export default function FieldUpload({
  id = 'file-upload',
  color = 'inherit',
  label = 'Choose File',
  accept = '.pdf,.docx,.doc,.jpg,.jpeg,.png,.json,.txt,.rtf,.md,.jpeg,.odt',
  multiple = false,
  onSelect,
}: TFieldUpload) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onSelect?.(files[0]);
      inputRef.current!.value = ''; // reset so selecting same file again retriggers
    }
  };

  return (
    <Box>
      <input
        id={id}
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <Button color={color as any} variant="contained" onClick={handleClick}>
        {label}
      </Button>
    </Box>
  );
}
