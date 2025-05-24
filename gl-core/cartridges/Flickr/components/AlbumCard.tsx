'use client';

import * as React from 'react';
import {
  Box,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { MightyButton, useSlice } from '../../../../gl-core';
import { TAlbumCard } from '../types';

export default function AlbumCard({
  // id = null,
}: TAlbumCard) {
  const { album } = useSlice().flickr ?? {};
  const isAdmin = true;

  if (!album || !album.meta) {
    return (
      <Typography variant="body2" sx={{ padding: 2 }}>
        Herding pandas...
      </Typography>
    );
  }

  const { 
    title = '', 
    description = '', 
    coverPhoto, 
    albumUrl,
  } = album.meta;

  
  const {
    src,
  } = coverPhoto.sizes.thumb;

  // console.log("src", src)

  return (
    <Box sx={{}}>
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
        <Box sx={{ display:"flex" }}>
          <Box 
            sx={{
              mt: 0.5,
              mr: 2,
            }}>
            <img
              style={{
                borderRadius: "8px",
              }}
              alt={title}
              height={100}
              width={100}
              src={src}
            />
          </Box>
          <Box>
            <Typography variant="body2">
              {description}
            </Typography>
          </Box>
        </Box>
        


        
      </CardContent>
    </Box>
  );
}
