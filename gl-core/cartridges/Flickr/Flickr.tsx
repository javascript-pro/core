'use client';
import * as React from 'react';
import { 
  Card,
  CardHeader,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Icon, useSlice } from '../../../gl-core';

export type TFlickr = {
  frontmatter?: any;
};

export default function Flickr({ 
  frontmatter = {
    title: "Flickr",
    description: "Herding pandas",
    icon: "flickr",
  }, 
}: TFlickr) {
  
  const flickr = useSlice().flickr;
  const {loading} = flickr
  const {title, description, icon} = frontmatter;
  return (
    <Card
      sx={{
        m: 2,
      }}
    >
      <CardHeader 
        avatar={<Icon icon={icon} />}
        action={ loading ? <CircularProgress /> : null }
        title={title}
        subheader={description}
      />
      <CardContent>
        <pre>
          loading: {JSON.stringify(loading, null, 2)}
        </pre>
        {frontmatter ? <>
          {/*  */}
        </> : <>
          No frontmatter. No Matter
        </>}        
      </CardContent>
    </Card>
  );
}
