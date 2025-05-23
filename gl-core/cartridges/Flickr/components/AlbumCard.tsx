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
import { PhotoCard } from '../';
import { TAlbumCard } from '../types';

export default function AlbumCard({ id = null }: TAlbumCard) {
  const { album } = useSlice().flickr ?? {};
  const isAdmin = false;
  const mode = "list";

  if (!album) {
    return (
      <Typography variant="body2" sx={{ padding: 2 }}>
        Herding pandas...
      </Typography>
    );
  }

  const {
    title = 'Untitled',
    description = '',
    coverPhoto,
    photos = [],
    albumUrl,
  } = album;

  return (
    <Box>
      <CardHeader
        title={title}
        subheader={description}
        avatar={!isAdmin ? null : 
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
        { coverPhoto?.sizes?.medium?.src && (
          <CardMedia
            component="img"
            src={coverPhoto.sizes.large.src}
            alt={coverPhoto.title || 'Album Cover'}
            sx={{
              maxHeight: 315,
              maxWidth: 600,
            }}
          />
        )}

        <Grid container spacing={1}>
          {/* {photos.length > 0 &&
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
            })} */}
        </Grid>
      </CardContent>
    </Box>
  );
}
