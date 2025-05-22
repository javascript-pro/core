'use client';

import * as React from 'react';
import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { Icon, MightyButton, useSlice } from '../../../../gl-core';
import { PhotoCard } from '../';
import { TAlbumCard } from '../types';

export default function AlbumCard({ id = null }: TAlbumCard) {
  const { album } = useSlice().flickr ?? {};

  if (!album) {
    return (
      <Typography variant="body2" sx={{ padding: 2 }}>
        No album data available.
      </Typography>
    );
  }

  const {
    title = 'Untitled',
    description = '',
    coverPhoto,
    // count,
    photos = [],
    albumUrl,
  } = album;

  return (
    <Box>
      <CardHeader
        avatar={<Icon icon="album" />}
        title={title}
        subheader={description}
        action={
          <MightyButton
            mode="icon"
            icon="link"
            label="View on Flickr"
            color="inherit"
            onClick={() => window.open(albumUrl, '_blank')}
          />
        }
      />
      <CardContent>
        {coverPhoto?.sizes?.small?.src && (
          <CardMedia
            component="img"
            src={coverPhoto.sizes.small.src}
            alt={coverPhoto.title || 'Cover photo'}
          />
        )}

        {/* {coverPhoto?.title && (
          <Typography variant="body1">
            {coverPhoto.title}
          </Typography>
        )}

        {coverPhoto?.description && (
          <Typography variant="body2">
            {coverPhoto.description}
          </Typography>
        )} */}

        {photos.length > 0 &&
          photos.map((photo: any, i: number) => (
            <PhotoCard key={`photo_${i}`} photo={photo} />
          ))}
      </CardContent>
    </Box>
  );
}
