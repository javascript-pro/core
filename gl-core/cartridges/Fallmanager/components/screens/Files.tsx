'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/Files.tsx
import * as React from 'react';
import config from '../../fallmanager.json';
import { Box, Grid } from '@mui/material';
import {
  FieldUpload,
  useDispatch,
  toggleFeedback,
  uploadToStorage,
  MightyButton,
} from '../../../../../gl-core';
import { Uploads } from '../../../Fallmanager';

export type TFileType = {
  title: string;
  description?: string;
  extension: string;
  icon: string;
};

export default function Files() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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

  React.useEffect(() => {
    dispatch(
      toggleFeedback({
        title: 'Upload a file',
      }),
    );
  }, [dispatch]);

  const handleFileSelect = (file: File | null) => {
    if (!file) return setSelectedFile(null);

    const isAllowed = allowedFileTypes.some((type) =>
      file.name.toLowerCase().endsWith(type.extension),
    );

    if (!isAllowed) {
      alert('Unsupported file type.');
      return setSelectedFile(null);
    }

    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (!selectedFile) {
      alert('Please select a valid file before uploading.');
      return;
    }

    dispatch(
      uploadToStorage({
        file: selectedFile,
        slug: config.slug,
      }),
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Uploads />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FieldUpload onSelect={handleFileSelect} />
        <MightyButton
          label="Upload"
          icon="upload"
          onClick={handleUploadClick}
          variant="contained"
        />
      </Grid>
    </Grid>
  );
}
