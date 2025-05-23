'use client';

import * as React from 'react';
import { TPhotoCard } from '../types';
import { Box, CardHeader, CardMedia } from '@mui/material';
import { Icon, MightyButton } from '../../../../gl-core';

export default function PhotoCard({ mode = 'card', photo = {} }: TPhotoCard) {
  const { title, description, sizes, flickrUrl } = photo;
  const size = sizes.small;

  if (mode === 'card') {
    return (
      <>
        <CardHeader
          title={`${title}`}
          subheader={`${description}`}
          avatar={
            <MightyButton
              mode="icon"
              icon="link"
              label="View on Flickr"
              color="inherit"
              onClick={() => window.open(flickrUrl, '_blank')}
            />
          }
        />
        <CardMedia
          component="img"
          src={size.src}
          alt={description || 'Single Photo'}
          sx={{
            maxHeight: 175,
          }}
        />
      </>
    );
  }

  return null;
}
