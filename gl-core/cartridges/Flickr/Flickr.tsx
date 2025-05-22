'use client';
import * as React from 'react';
import { Box, CardHeader, CardContent, CircularProgress } from '@mui/material';
import { Icon, useSlice, useDispatch } from '../../../gl-core';
import { initFlickr, AlbumCard } from './';

export default function Flickr({
  frontmatter = {
    title: 'Flickr',
    description: 'Herding pandas',
    icon: 'flickr',
  },
}: any) {
  const flickr = useSlice().flickr;
  const dispatch = useDispatch();
  const { 
    loading = false,
    album = null,
  } = flickr;
  const { title, description, icon } = frontmatter;

  React.useEffect(() => {
    dispatch(initFlickr());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ m: 0 }}>
        <CardHeader
          // avatar={<Icon icon={icon} />}
          action={loading ? <CircularProgress color="secondary" /> : null}
          title={title}
          subheader={description}
        />
        <CardContent>
          {frontmatter ? (
            <>
              <AlbumCard />
            </>
          ) : (
            <>No frontmatter. No Matter</>
          )}
        </CardContent>
      </Box>
         
    </>
  );
}

/*
<pre>flickr: {JSON.stringify(flickr, null, 2)}</pre>
*/