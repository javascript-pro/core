'use client';

import * as React from 'react';
import {TPhotoCard} from "../types";
import {
  Box,
  CardHeader,
} from '@mui/material';
import { Icon } from '../../../../gl-core';

export default function PhotoCard({
  id = null,
  photo = {
  },
}: TPhotoCard) {
  
  // console.log("photo", photo)

  const {
    title,
    description,
  } = photo;


  return (
    <>
      <Box>
        <CardHeader 
          avatar={<Icon icon="photo" />}
          title={`${title}`}
          subheader={`${description}`}
        />
        {/* <pre style={{fontSize: 10 }}>
          photo: {JSON.stringify(photo, null, 2)}
        </pre>   */}
      </Box>    
    </>
  );
}
