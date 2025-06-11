// core/gl-core/components/FieldUpload.tsx
'use client';
import * as React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Icon } from '../../../gl-core';

export type TFieldUpload = {
  id?: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  fileName?: string | null;
  onSelect?: (file: File | null) => void;
  onReset?: () => void;
};

export default function FieldUpload({
  id = 'file-upload',
  label = 'Choose File',
  accept = '.pdf,.docx,.jpg,.jpeg,.png,.json',
  multiple = false,
  fileName = null,
  onSelect,
  onReset,
}: TFieldUpload) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onSelect?.(file);
    } else {
      onSelect?.(null);
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onReset?.();
    onSelect?.(null);
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

      {!fileName && (
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<Icon icon="link" />}
        >
          {label}
        </Button>
      )}

      {fileName && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
            Selected: {fileName}
          </Typography>
          <IconButton size="small" onClick={handleClear}>
            <Icon icon="close" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
