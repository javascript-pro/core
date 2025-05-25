'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from '../../../gl-core';
import { initFlickr, AlbumCard } from './';
import { TFlickr } from './types';
import { CardButton, useSlice } from '../../../gl-core';

export default function Flickr({
  mode = 'default',
  id = null,
  onClick = () => {
    console.log('No onClick supplied to Flickr');
  },
}: TFlickr) {
  const dispatch = useDispatch();
  const flickrSlice = useSlice().flickr;
  React.useEffect(() => {
    if (id) {
      dispatch(initFlickr(id));
    }
  }, [id, dispatch]);

  if (mode === 'default') return <></>;
  if (!id) return <>No albumId</>;

  if (mode === 'album-card')
    return (
      <Box sx={{}}>
        <CardButton onClick={onClick}>
          <AlbumCard id={id} />
        </CardButton>
      </Box>
    );

  return (
    <pre style={{ fontSize: 10 }}>
      flickrSlice: {JSON.stringify(flickrSlice, null, 2)}
    </pre>
  );
}
