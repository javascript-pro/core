'use client';
import * as React from 'react';
import { Card, CardHeader, CardContent, CircularProgress } from '@mui/material';
import { Icon, useSlice, useDispatch } from '../../../gl-core';
import { initFlickr } from './';

export type TFlickr = {
  frontmatter?: any;
};

export default function Flickr({
  frontmatter = {
    title: 'Flickr',
    description: 'Herding pandas',
    icon: 'flickr',
  },
}: TFlickr) {
  const flickr = useSlice().flickr;
  const dispatch = useDispatch();
  const { 
    loading = false, 
    status = "info", 
    message = "Herding pandas",
  } = flickr;
  const { title, description, icon } = frontmatter;

  React.useEffect(() => {
    dispatch(initFlickr());
  }, [dispatch]);

  return (
    <>
      <Card sx={{ m: 0 }}>
        <CardHeader
          avatar={<Icon icon={icon} />}
          action={loading ? <CircularProgress color="secondary" /> : null}
          title={title}
          subheader={description}
        />
        <CardContent>
          
          {frontmatter ? (
            <>
              {message}
            </>
          ) : (
            <>No frontmatter. No Matter</>
          )}
        </CardContent>
        
      </Card>
      <pre>flickr: {JSON.stringify(flickr, null, 2)}</pre>
    </>
  );
}
