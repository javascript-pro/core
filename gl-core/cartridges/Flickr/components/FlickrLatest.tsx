'use client';

import * as React from 'react';
import { TAlbumCard } from '../types';
import {
  Box,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { MightyButton, Icon, useSlice } from '../../../../gl-core';

export default function FlickrLatest({}: TAlbumCard) {
  const { flickr } = useSlice() ?? {};

  return (
    <Box sx={{}}>
      <CardHeader
        avatar={<Icon icon="flickr" />}
        title="Flickr Latest"
        action={
          <Box
            id="flickr_latest_controls"
            sx={{
              display: 'flex',
              width: '100%',
            }}
          >
            <MightyButton
              mode="icon"
              fullWidth
              variant="contained"
              label="Reload"
              icon="reset"
            />
          </Box>
        }
      />

      <CardContent>
        <Card sx={{ my: 1 }}>
          <CardMedia
            alt="Cassetes"
            src="/jpg/cassetes.jpg"
            component={'img'}
            height={150}
          />
        </Card>
      </CardContent>

      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <MightyButton
          mode="icon"
          color="primary"
          label="Last photo"
          icon="left"
        />
        <MightyButton mode="icon" label="Next photo" icon="right" />
        <Box sx={{ flexGrow: 1 }} />
      </CardActions>

      <pre style={{ fontSize: 10 }}>
        flickr: {JSON.stringify(flickr, null, 2)}
      </pre>
    </Box>
  );
}
