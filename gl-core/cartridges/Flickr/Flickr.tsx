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
      {frontmatter ? <AlbumCard /> : <>No frontmatter. No matter.</>}
    </Box>
  );
}
