// core/gl-core/cartridges/Fallmanager/components/screens/UploadNew.tsx
'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import config from '../../fallmanager.json';
import {
  FieldUpload,
  useDispatch,
  uploadToStorage,
  MightyButton,
} from '../../../../../gl-core';

export default function UploadNew() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const allowedFileTypes = ['.json', '.pdf', '.jpg', '.docx'];

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setFileName(null);
      return;
    }

    const isAllowed = allowedFileTypes.some((ext) =>
      file.name.toLowerCase().endsWith(ext),
    );

    if (!isAllowed) {
      alert('Unsupported file type.');
      setSelectedFile(null);
      setFileName(null);
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileName(null);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      alert('Please select a valid file before uploading.');
      return;
    }

    await dispatch(
      uploadToStorage({
        file: selectedFile,
        slug: config.slug,
      }),
    );

    // ✅ Reset on successful upload
    handleReset();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FieldUpload
        label="Choose file"
        fileName={fileName}
        onSelect={handleFileSelect}
        onReset={handleReset}
      />
      {selectedFile && (
        <MightyButton
          label="Upload"
          icon="upload"
          onClick={handleUploadClick}
          variant="contained"
        />
      )}
    </Box>
  );
}
