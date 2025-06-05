// core/gl-core/cartridges/Flickr/components/AlbumSelecta.tsx

'use client';

import * as React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useSlice, useDispatch, Icon } from '../../../../gl-core';
import { fetchAlbumList } from '../../Flickr';

export type TAlbumSelecta = {
  onSelect?: (albumId: string) => void;
};

const FRESHNESS_THRESHOLD = 1000 * 60 * 10; // 10 minutes

export default function AlbumSelecta({ onSelect }: TAlbumSelecta) {
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

  const renderContent = () => {
    if (albumList.loading) {
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

    if (albumList.loaded) {
      return (
        <List dense>
          {albumList.list.map((album: any) => (
            <ListItemButton
              key={album.flickrId}
              onClick={() => onSelect?.(album.flickrId)}
            >
              <ListItemIcon>
                <Icon icon="flickr" />
              </ListItemIcon>
              <ListItemText
                primary={album.title}
                // secondary={album.description}
              />
            </ListItemButton>
          ))}
        </List>
      );
    }

    return null;
  };

  return (
    <Box sx={{}}>
      {renderContent()}
    </Box>
  );
}
