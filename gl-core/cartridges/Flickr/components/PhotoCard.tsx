'use client';

import * as React from 'react';
import {TPhotoCard} from "../types";
import {
  Box,
} from '@mui/material';
import { Icon } from '../../../../gl-core';

export default function PhotoCard({
  id = null,
}: TPhotoCard) {
  
  return (
    <>
      <Box>
        <Icon icon="photo" />
        Photo id {id}
      </Box>    
    </>
  );
}
