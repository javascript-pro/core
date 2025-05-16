'use client';

import * as React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

export type TPhoto = {
  src: string | null;
};

const validExtensions = ['jpg', 'jpeg', 'png', 'svg', 'webp'];

const isValidImage = (src: string | null): boolean => {
  if (!src) return false;
  const ext = src.split('.').pop()?.toLowerCase() || '';
  return validExtensions.includes(ext);
};

export default function Photo({ src = null }: TPhoto) {
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
    <CardMedia
      component="img"
      src={src as string}
      alt="Photo"
      sx={{
        width: '100%',
        maxWidth: '100%',
        maxHeight: 200,
        objectFit: 'cover',
      }}
    />
  );
}
