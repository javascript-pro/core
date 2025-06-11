'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/UploadNew.tsx

import * as React from 'react';
import { Box } from '@mui/material';
import config from '../../fallmanager.json';
import {
  FieldUpload,
  useDispatch,
  uploadToStorage,
  MightyButton,
} from '../../../../../gl-core';

export type TFileType = {
  title: string;
  description?: string;
  extension: string;
  icon: string;
};

export default function UploadNew() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isValid, setIsValid] = React.useState(false);

  const allowedFileTypes: TFileType[] = [
    {
      title: 'JSON',
      description: 'JavaScript Notation Language',
      extension: '.json',
      icon: 'json',
    },
    {
      title: 'PDF',
      description: 'Portable Document Format',
      extension: '.pdf',
      icon: 'pdf',
    },
    {
      title: 'Scanned Image',
      description: 'JPG',
      extension: '.jpg',
      icon: 'jpg',
    },
    { title: 'Word Document', extension: '.docx', icon: 'word' },
  ];

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setIsValid(false);
      return;
    }

    const isAllowed = allowedFileTypes.some((type) =>
      file.name.toLowerCase().endsWith(type.extension),
    );

    if (!isAllowed) {
      alert('Unsupported file type.');
      setSelectedFile(null);
      setIsValid(false);
      return;
    }

    setSelectedFile(file);
    setIsValid(true);
  };

  const handleUploadClick = () => {
    if (!selectedFile || !isValid) return;

    dispatch(
      uploadToStorage({
        file: selectedFile,
        slug: config.slug,
      }),
    );
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>  
      {isValid && (
        <MightyButton
          label="Upload"
          icon="upload"
          onClick={handleUploadClick}
          variant="outlined"
          color="secondary"
        />
      )}
      <FieldUpload label="Choose file" onSelect={handleFileSelect} />
    </Box>
  );
}
