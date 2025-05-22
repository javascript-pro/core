'use client';

import * as React from 'react';
import { TPhotoCard } from '../types';
import { Box, CardHeader, CardMedia } from '@mui/material';
import { Icon } from '../../../../gl-core';

export default function PhotoCard({ id = null, photo = {} }: TPhotoCard) {
  //

  const { title, description, sizes } = photo;

  const size = sizes.small;

  return (
    <>
      {/* <pre style={{fontSize: 10}}>sizes.small: {JSON.stringify(sizes.small, null, 2)}</pre> */}

      <Box>
        <CardHeader
          avatar={<Icon icon="photo" />}
          title={`${title}`}
          subheader={`${description}`}
        />
        <CardMedia
          component="img"
          src={size.src}
          alt={description || 'Single Photo'}
          height={50}
        />
        {/* <pre style={{fontSize: 10 }}>
          photo: {JSON.stringify(photo, null, 2)}
        </pre>   */}
      </Box>
    </>
  );
}
