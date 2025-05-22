'use client';

import * as React from 'react';
import {TAlbumCard} from "../types";
import {
  Box,
} from '@mui/material';
import { Icon } from '../../../../gl-core';

export default function AlbumCard({
  id = null,
}: TAlbumCard) {
  
  return (
    <>
      <Box>
        <Icon icon="album" />
        Album id {id}
      </Box>    
    </>
  );
}
