'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { FlickrAlbum as Flickr } from '../../cartridges/Flickr'

export type TFlickrAlbum = {
  id?: string | null;
};

export default function FlickrAlbum({ id = null }: TFlickrAlbum) {
  if (!id) return null;
  return <>FlickrAlbum {id}</>
}
