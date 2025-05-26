'use client';

import * as React from 'react';
// import { Box, CardHeader, CardMedia } from '@mui/material';
// import { MightyButton } from '../../../../gl-core';

export type TPhotoPopup = {
  [key: string]: any;
};

export default function PhotoPopup({ 
  photo = null,
}: TPhotoPopup) {

  return (
    <>
      <pre style={{ fontSize: 10 }}>
        photo: {JSON.stringify(photo, null, 2)}
      </pre>
    </>
  );
}
