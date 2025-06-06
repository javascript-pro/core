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
import { fetchAlbumList, resetAlbum } from '../../Flickr';

export type TAlbumSelecta = {
  onSelect?: (albumId: string) => void;
  onAlbumSelect?: (album: any) => void;
};

const FRESHNESS_THRESHOLD = 1000 * 60 * 60 * 24; // 1 day

export default function AlbumSelecta({
  
  onSelect = () => {
    // console.log("onSelect");
  },
  onAlbumSelect = () => {},
}: TAlbumSelecta) {
  const dispatch = useDispatch();
  const albumList = useSlice().flickr?.albumList;

  const selectEvent = (selected: any) => {
    const { flickrId } = selected;
    // console.log("onAlbumSelect", flickrId);
    dispatch(resetAlbum(flickrId));
  }

  React.useEffect(() => {
    if (!albumList) return;

    const now = Date.now();
    const isStale =
      !albumList.lastLoad || now - albumList.lastLoad > FRESHNESS_THRESHOLD;
    const isEmpty =
      !Array.isArray(albumList.list) || albumList.list.length === 0;

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
    (a, b) => (b.dateCreate ?? 0) - (a.dateCreate ?? 0),
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
          const tags = (album.coverPhoto?.meta?.tags || [])
            .join(' ')
            .toLowerCase();
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
          selectEvent?.(selected);
        }
      }}
      renderInput={(params) => (
        <TextField 
          color="secondary"
          variant='filled' 
          {...params} 
          label="Find an album" 
        />
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



    /*
    {
    "flickrId": "72177720326289602",
    "title": "Mimizan",
    "description": "Surf spot on the French Atlantic coast",
    "count": 6,
    "dateCreate": 1747889830,
    "albumUrl": "https://www.flickr.com/photos/24006659@N00/albums/72177720326289602",
    "coverPhoto": {
        "flickrId": "54538420041",
        "flickrUrl": "https://www.flickr.com/photos/24006659@N00/54538420041",
        "title": "Wave: 0.8-1.3 meters",
        "description": "",
        "time": 1747943703000,
        "lat": null,
        "lng": null,
        "meta": {
            "tags": [
                "surf"
            ]
        },
        "sizes": {
            "thumb": {
                "src": "https://live.staticflickr.com/65535/54538420041_7ae61cc6e0_q.jpg",
                "width": 150,
                "height": 150
            },
            "small": {
                "src": "https://live.staticflickr.com/65535/54538420041_7ae61cc6e0_n.jpg",
                "width": 320,
                "height": 180
            },
            "medium": {
                "src": "https://live.staticflickr.com/65535/54538420041_7ae61cc6e0_c.jpg",
                "width": 800,
                "height": 449
            },
            "large": {
                "src": "https://live.staticflickr.com/65535/54538420041_7ae61cc6e0_b.jpg",
                "width": 990,
                "height": 556
            },
            "orig": {
                "src": "https://live.staticflickr.com/65535/54538420041_2fbf4acb72_o.jpg",
                "width": 990,
                "height": 556
            }
        }
    }
}
    */
