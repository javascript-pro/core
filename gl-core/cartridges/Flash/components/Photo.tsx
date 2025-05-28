'use client';

import * as React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

export type TPhoto = {
  maxHeight?: number | string | null;
  src: string | null;
  alt?: string | null;
};

const validExtensions = ['jpg', 'jpeg', 'png', 'svg', 'webp'];

const isValidImage = (src: string | null): boolean => {
  if (!src) return false;
  const ext = src.split('.').pop()?.toLowerCase() || '';
  return validExtensions.includes(ext);
};

export default function Photo({ 
  alt = "Featured Image", 
  src = null, 
  maxHeight = null 
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
        height: 630,
        maxHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={src as any}
          alt={alt || 'Photo'}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
      </Box>
    </Box>
  );
}
