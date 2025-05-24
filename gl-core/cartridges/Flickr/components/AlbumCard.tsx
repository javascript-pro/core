'use client';

import * as React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { MightyButton, useSlice } from '../../../../gl-core';
import { PhotoCard } from '../';
import { TAlbumCard } from '../types';

export default function AlbumCard({ id = null }: TAlbumCard) {
  const { album } = useSlice().flickr ?? {};
  const { photos } = album;
  const isAdmin = true;
  const showPhotos = false;

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
    <Card sx={{}}>
      <CardHeader
        title={title}
        action={
          !isAdmin ? null : (
            <MightyButton
              mode="icon"
              icon="flickr"
              label="View album on Flickr"
              color="inherit"
              onClick={() => window.open(albumUrl, '_blank')}
            />
          )
        }
      />
      <CardContent>
        <Typography variant="body1">{description}</Typography>
        {/* {coverSrc && (
          <CardMedia
            component="img"
            src={coverSrc}
            alt={coverPhoto?.title || 'Album Cover'}
            sx={{
              maxHeight: 300,
              maxWidth: 600,
            }}
          />
        )} */}

        <Grid container spacing={1}>
          {photos.length > 0 &&
            showPhotos &&
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
                  <PhotoCard mode="list" photo={photo} />
                </Grid>
              );
            })}
        </Grid>
      </CardContent>
    </Card>
  );
}
