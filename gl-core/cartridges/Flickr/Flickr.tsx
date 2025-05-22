'use client';
import * as React from 'react';
import { Typography } from '@mui/material';
import { useSlice } from '../../';

export type TFlickr = {
  album?: string | null;
  photo?: string | null;
};

export default function Flickr({ album = null, photo = null }: TFlickr) {
  const flickr = useSlice().flickr;
  return (
    <>
      <Typography variant="h2">Flickr</Typography>
      <pre style={{ fontSize: 10 }}>
        flickr: {JSON.stringify(flickr, null, 2)}
      </pre>
    </>
  );
}
