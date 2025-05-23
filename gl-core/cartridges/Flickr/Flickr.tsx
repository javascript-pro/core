'use client';
import * as React from 'react';
import { Box, CardHeader, CircularProgress } from '@mui/material';
import { useSlice, useDispatch } from '../../../gl-core';
import { initFlickr, AlbumCard } from './';

export default function Flickr({
  frontmatter = {
    title: 'Flickr',
    description: 'Herding pandas',
    icon: 'flickr',
  },
}: any) {
  //const flickr = useSlice().flickr;
  const dispatch = useDispatch();
  // const {
  //   loading = false,
  //   // album = null,
  // } = flickr;
  // const { title, description } = frontmatter;

  React.useEffect(() => {
    dispatch(initFlickr());
  }, [dispatch]);

  return <Box sx={{ mx:2}}>
          { frontmatter ? <AlbumCard /> : <>No frontmatter. No matter.</>}
        </Box>
}

/*
<pre>flickr: {JSON.stringify(flickr, null, 2)}</pre>
*/
