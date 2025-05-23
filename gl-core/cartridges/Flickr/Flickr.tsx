'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, CardHeader, CircularProgress } from '@mui/material';
import { useSlice, useDispatch } from '../../../gl-core';
import { initFlickr, AlbumCard } from './';

export default function Flickr({
  album = null,
  frontmatter = null,
}: any) {
  const slice = useSlice();
  const {
    flickr,
  } = slice;
  const albumObj = flickr.album;
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const queryAlbum = searchParams.get('album');
  const albumId = queryAlbum || album || slice.defaultId;

  React.useEffect(() => {
    if (albumId) {
      dispatch(initFlickr(albumId));
    }
  }, [albumId, dispatch]);

  return (
    <Box sx={{ mx: 2 }}>
      
      {/* <pre style={{fontSize:10}}>
        flickr: {JSON.stringify(flickr, null, 2)}
      </pre> */}
      
      { frontmatter ? <AlbumCard /> : <>No frontmatter. No matter.</>}
    </Box>
  );
}
