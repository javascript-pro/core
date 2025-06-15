// core/gl-core/cartridges/Fallmanager/components/screens/UploadNew.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import config from '../../data/config.json';
import { useDispatch, uploadToStorage } from '../../../../../gl-core';
import { UploadField } from '../../../Fallmanager';

export default function UploadNew() {
  const dispatch = useDispatch();

  const allowedFileTypes = [
    '.json',
    '.pdf',
    '.jpg',
    '.docx',
    '.doc',
    '.png',
    '.jpeg',
    '.txt',
    '.odt',
    '.rtf',
    '.md',
  ];

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;

    const isAllowed = allowedFileTypes.some((ext) =>
      file.name.toLowerCase().endsWith(ext),
    );

    if (!isAllowed) {
      alert('Unsupported file type.');
      return;
    }

    try {
      await dispatch(
        uploadToStorage({
          file,
          slug: config.slug,
        }),
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      alert(`Upload failed: ${msg}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <UploadField color="secondary" label="Upload" onSelect={handleFileSelect} />
    </Box>
  );
}
