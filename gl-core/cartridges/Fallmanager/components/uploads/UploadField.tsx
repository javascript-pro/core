// core/gl-core/cartridges/Fallmanager/components/uploads/UploadField.tsx
'use client';
import * as React from 'react';
import { CustomButton } from '../../../Fallmanager';

export type TUploadField = {
  id?: string;
  label?: string;
  color?: string;
  accept?: string;
  multiple?: boolean;
  onSelect?: (file: File | null) => void;
};

export default function UploadField({
  id = 'new-upload',
  label = 'Upload new file',
  accept = '.pdf',
  multiple = false,
  onSelect,
}: TUploadField) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onSelect?.(files[0]);
      inputRef.current!.value = '';
    }
  };

  return (
    <>
      <input
        id={id}
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <CustomButton
        mode="button"
        label={label}
        variant="contained"
        onClick={handleClick}
        icon="upload"
      />
    </>
  );
}
