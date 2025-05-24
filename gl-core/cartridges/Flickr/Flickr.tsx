'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from '../../../gl-core';
import { initFlickr, AlbumCard } from './';
import { TFlickr } from './types';
import { CardButton, useSlice } from '../../../gl-core';

export default function Flickr({
  mode = "default",
  albumId = null,
  onClick = () => {
    console.log("No onClick supplied to Flickr")
  },
}: TFlickr) {
  const dispatch = useDispatch();
  const flickrSlice = useSlice().flickr;
  React.useEffect(() => {
    if (albumId) {
      dispatch(initFlickr(albumId));
    }
  }, [albumId, dispatch]);

  if (!albumId) return <>No albumId</>

  if (mode === 'default') return <>Default Album View</>

  if (mode === 'album-card') return (
    <Box sx={{  }}>
      <CardButton onClick={onClick}>
        <AlbumCard />
      </CardButton>
    </Box>
  );

  return <pre style={{fontSize:10}}>
          flickrSlice: {JSON.stringify(flickrSlice, null, 2)}
        </pre>
}
