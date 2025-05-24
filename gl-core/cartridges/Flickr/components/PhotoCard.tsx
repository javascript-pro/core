'use client';

import * as React from 'react';
import { TPhotoCard } from '../types';
import { Box, CardHeader, CardMedia } from '@mui/material';
import { MightyButton } from '../../../../gl-core';

export default function PhotoCard({ mode = 'card', photo = {} }: TPhotoCard) {
  const { title, description, sizes, flickrUrl } = photo;
  const size = sizes.small;
  const isAdmin = false;

  if (mode === 'list') return <>list</>;

  if (mode === 'card') {
    return (
      <>
        <CardHeader
          title={`${title}`}
          subheader={`${description}`}
          avatar={
            !isAdmin ? null : (
              <MightyButton
                mode="icon"
                icon="link"
                label="View on Flickr"
                color="inherit"
                onClick={() => window.open(flickrUrl, '_blank')}
              />
            )
          }
        />
        <CardMedia
          component="img"
          src={size.src}
          alt={description || 'Single Photo'}
          sx={{
            maxHeight: 320,
            maxWidth: 320,
          }}
        />
      </>
    );
  }

  return null;
}
