'use client';
import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Icon } from '../../../gl-core';

export type TFieldUpload = {
  id?: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  onSelect?: (file: File | null) => void;
};

export default function FieldUpload({
  id = 'file-upload',
  label = 'Choose File',
  accept = '.pdf,.docx,.jpg,.jpeg,.png,.json',
  multiple = false,
  onSelect,
}: TFieldUpload) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onSelect?.(file);
    } else {
      setFileName(null);
      onSelect?.(null);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <input
        id={id}
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<Icon icon="link" />}
      >
        {label}
      </Button>
      {fileName && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {fileName}
        </Typography>
      )}
    </Box>
  );
}
