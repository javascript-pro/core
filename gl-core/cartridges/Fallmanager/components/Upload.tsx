'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useFallmanagerSlice,
  updateAssist,
  resetFallmanager,
  useLingua,
} from '../../Fallmanager';
import { useDispatch, MightyButton } from '../../../../gl-core';
import { LinearProgress } from '@mui/material';

export default function Upload() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { assist } = useFallmanagerSlice();
  const t = useLingua();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);

    if (selected) {
      const selectedFile = {
        name: selected.name,
        type: selected.type,
        size: selected.size,
        lastModified: selected.lastModified,
      };

      dispatch(
        updateAssist({
          selected: selectedFile,
          feedback: {
            severity: 'info',
            title: 'File selected. Ready to upload?',
            message: '',
          },
          step: 1,
        }),
      );

      setTimeout(() => {
        uploadFile(selected);
      }, 250);
    }
  };

  const uploadFile = async (file: File) => {
    dispatch(
      updateAssist({
        step: 2,
        feedback: {
          severity: 'success',
          title: 'Uploading...',
          message: '',
        },
      }),
    );

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/gl-api/fallmanager/hochladen', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(resetFallmanager());
        setTimeout(() => {
          window.open('/fallmanager', '_self');
        }, 100);
        return;
      }

      dispatch(
        updateAssist({
          step: 3,
          feedback: {
            severity: 'success',
            title: 'Upload complete',
            message: `File ID: ${data.docId}`,
          },
        }),
      );

      setTimeout(() => {
        dispatch(updateAssist({ reset: true }));
        setFile(null);
        setUploading(false);
        router.push(`/fallmanager/file/${data.docId}`);
      }, 500);
    } catch (err: any) {
      console.error('Upload failed:', err);
      dispatch(
        updateAssist({
          feedback: {
            severity: 'error',
            title: 'Upload failed',
            message: err.message || 'Something went wrong',
          },
        }),
      );
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {!uploading && (
        <MightyButton
          label={t('UPLOAD_FILE')}
          variant="contained"
          onClick={handleClick}
          color="primary"
          icon="upload"
        />
      )}

      {uploading && <LinearProgress sx={{ width: 200, border: "1px solid red", mt: 1 }} />}
    </>
  );
}
