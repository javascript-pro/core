'use client';
// core/gl-core/cartridges/Fallmanager/components/screens/UploadFile.tsx
import * as React from 'react';
import { Box } from '@mui/material';
import { FieldUpload } from '../../../../../gl-core';

export default function UploadFile() {
  console.log('UploadFile');

  return (
    <Box sx={{ p: 1, border: '1px solid gold' }}>
      In this component we offer the user an upload form. We have a Firebase
      storage folder and we will be uploading the file to that.
      <br />
      <br />
      <FieldUpload />
      <br />
      <br />
      The user can upload 1 file at a time by clicking a button labelled Upload
      File. When a file is selected, it is validated against an allowed list of
      filetype. I don't know that exact list yet, but it will be pdf, word docs,
      emails and image files which could be scans and require OCR
      <br />
      <br />
      So once we have a valid looking file, we upload it to Firebase storage.
      Can we do that from the client or does it _need_ to be done on the API for
      any reason?
      <br />
      <br />
      So it get's uploaded to firebase storage folder called "fallmanager". We
      also need to save a reference to the file in Firebase. I want to add these
      docs to the uploads collection. The docs need to have an attribute called
      slug, which in this case will be "fallmanager".
      <br />
      <br />
      This allows the upload thing to be used by other things as well as
      Fallmanager
    </Box>
  );
}
