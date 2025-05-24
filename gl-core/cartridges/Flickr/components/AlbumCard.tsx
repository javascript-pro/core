'use client';

import * as React from 'react';
import {
  Box,
  Grid,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { Icon, MightyButton, useSlice } from '../../../../gl-core';
// import { PhotoCard } from '../';
import { TAlbumCard } from '../types';

export default function AlbumCard({ id = null }: TAlbumCard) {
  const { album } = useSlice().flickr ?? {};
  const isAdmin = true;

  if (!album) {
    return (
      <Typography variant="body2" sx={{ padding: 2 }}>
        Herding pandas...
      </Typography>
    );
  }

  const { title = '', description = '', coverPhoto, albumUrl } = album.meta;

  const coverSrc =
    coverPhoto?.sizes?.large?.src ||
    coverPhoto?.sizes?.medium?.src ||
    coverPhoto?.sizes?.small?.src;

  return (
    <Box>
      <CardHeader
        title={title}
        subheader={description}
        avatar={
          !isAdmin ? null : (
            <MightyButton
              mode="icon"
              icon="flickr"
              label="View on Flickr"
              color="inherit"
              onClick={() => window.open(albumUrl, '_blank')}
            />
          )
        }
      />
      <CardContent>
        {coverSrc && (
          <CardMedia
            component="img"
            src={coverSrc}
            alt={coverPhoto?.title || 'Album Cover'}
            sx={{
              maxHeight: 300,
              maxWidth: 600,
            }}
          />
        )}

        <Grid container spacing={1}>
          {/* Uncomment and update when ready to render photos
          {photos.length > 0 &&
            photos.map((photo: any, i: number) => {
              if (photo.flickrId === coverPhoto?.flickrId) return null;
              return (
                <Grid
                  key={`photo_${i}`}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                  }}
                >
                  <PhotoCard mode="card" photo={photo} />
                </Grid>
              );
            })}
          */}
        </Grid>
      </CardContent>
    </Box>
  );
}
