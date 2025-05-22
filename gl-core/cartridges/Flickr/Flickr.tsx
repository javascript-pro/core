'use client';
import * as React from 'react';
import { 
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { Icon, useSlice, useDispatch } from '../../../gl-core';
import { initFlickr } from './';

export type TFlickr = {
  frontmatter?: any;
};

export default function Flickr({ 
  frontmatter = {
    title: "Flickr",
    description: "Herding pandas",
    icon: "flickr",
    message: "loading..."
  }, 
}: TFlickr) {
  const flickr = useSlice().flickr;
  const dispatch = useDispatch();
  const { loading, status, message } = flickr;
  const { title, description, icon } = frontmatter;

  React.useEffect(() => {
    dispatch(initFlickr());
  }, [dispatch]);

  return (
    <Card sx={{ m: 2 }}>
      <CardHeader 
        avatar={<Icon icon={icon} />}
        action={loading ? <CircularProgress color='secondary' /> : null}
        title={title}
        subheader={description}
      />
      <CardContent>
        <pre>
          loading: {JSON.stringify(loading, null, 2)}
        </pre>
        {frontmatter ? (
          <>{/* future frontmatter display */}</>
        ) : (
          <>No frontmatter. No Matter</>
        )}
        {status} {message}
      </CardContent>
    </Card>
  );
}
