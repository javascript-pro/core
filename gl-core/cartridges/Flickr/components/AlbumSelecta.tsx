'use client';

import * as React from 'react';
import {
  Box,
  CircularProgress,
  TextField,
  Autocomplete,
  Typography,
} from '@mui/material';
import { useSlice, useDispatch } from '../../../../gl-core';
import { fetchAlbumList } from '../../Flickr';

export type TAlbumSelecta = {
  onSelect?: (albumId: string) => void;
  onAlbumSelect?: (album: any) => void;
};

const FRESHNESS_THRESHOLD = 1000 * 60 * 60 * 24; // 1 day

export default function AlbumSelecta({ 
  onSelect = () => {
    // console.log("onSelect");
  }, 
  onAlbumSelect = (selected) => {
    // console.log("onAlbumSelect", selected);
  }, 

}: TAlbumSelecta) {
  const dispatch = useDispatch();
  const albumList = useSlice().flickr?.albumList;

  React.useEffect(() => {
    if (!albumList) return;

    const now = Date.now();
    const isStale = !albumList.lastLoad || now - albumList.lastLoad > FRESHNESS_THRESHOLD;
    const isEmpty = !Array.isArray(albumList.list) || albumList.list.length === 0;

    if ((isStale || isEmpty) && !albumList.loading) {
      dispatch(fetchAlbumList());
    }
  }, [albumList, dispatch]);

  if (!albumList || albumList.loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={16} />
        <Typography variant="body2">Loading albums…</Typography>
      </Box>
    );
  }

  if (albumList.loaded && albumList.list.length === 0) {
    return <Typography variant="body2">No albums found.</Typography>;
  }

  const sortedAlbums = [...albumList.list].sort(
    (a, b) => (b.dateCreate ?? 0) - (a.dateCreate ?? 0)
  );

  return (
    <Autocomplete
      fullWidth
      options={sortedAlbums}
      getOptionLabel={(option) => option.title || 'Untitled'}
      filterOptions={(options, { inputValue }) => {
        const query = inputValue.toLowerCase();
        return options.filter((album) => {
          const title = album.title?.toLowerCase() || '';
          const description = album.description?.toLowerCase() || '';
          const tags = (album.coverPhoto?.meta?.tags || []).join(' ').toLowerCase();
          const lat = album.coverPhoto?.lat?.toString() || '';
          const lng = album.coverPhoto?.lng?.toString() || '';
          return (
            title.includes(query) ||
            description.includes(query) ||
            tags.includes(query) ||
            lat.includes(query) ||
            lng.includes(query)
          );
        });
      }}
      onChange={(event, selected) => {
        if (selected) {
          onSelect?.(selected.flickrId);
          onAlbumSelect?.(selected);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Flickr Album" size="small" />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.flickrId}>
          <Box>
            <Typography variant="body2">{option.title}</Typography>
            {/* <Typography variant="caption" color="text.secondary">
              {option.description}
            </Typography> */}
          </Box>
        </li>
      )}
    />
  );
}
