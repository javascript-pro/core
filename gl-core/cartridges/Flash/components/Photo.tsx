'use client';

import * as React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

export type TPhoto = {
  maxHeight?: number | string | null;
  src: string | null;
};

const validExtensions = ['jpg', 'jpeg', 'png', 'svg', 'webp'];

const isValidImage = (src: string | null): boolean => {
  if (!src) return false;
  const ext = src.split('.').pop()?.toLowerCase() || '';
  return validExtensions.includes(ext);
};

export default function Photo({ 
  src = null,
  maxHeight = null,
}: TPhoto) {
  if (!isValidImage(src)) {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary">
          Invalid image source.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        // height: 310,
        maxHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      <CardMedia
        component="img"
        src={src as string}
        alt="Photo"
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
}
