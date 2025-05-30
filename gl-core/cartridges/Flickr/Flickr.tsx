'use client';
import * as React from 'react';
import {
  CardHeader,
  Box,
  Alert,
  Toolbar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useDispatch, Advert, routeTo } from '../../../gl-core';
import { initFlickr, resetFlickr } from './';
import { TFlickr } from './types';
import { MightyButton, useSlice } from '../../../gl-core';
import { useRouter } from 'next/navigation';

export default function Flickr({
  mode = 'default',
  id = null,
  onClick = () => {
    console.log('No onClick supplied to Flickr');
  },
}: TFlickr) {
  const router = useRouter();
  const dispatch = useDispatch();
  const flickrSlice = useSlice().flickr;
  const { album = null } = flickrSlice ?? {};

  const showToolbar = false;
  const albumTitle = album?.meta?.title || '';
  const albumDescription = album?.meta?.description || '';
  // const albumThumbSrc = album?.meta?.coverPhoto?.sizes?.thumb?.src || '';
  const albumPhotos = album?.photos || [];
  const albumURL = album?.meta?.albumUrl || '';

  React.useEffect(() => {
    if (id) {
      dispatch(initFlickr(id));
    }
  }, [id, dispatch]);

  if (mode === 'app') {
    const notReady = !album?.meta || !Array.isArray(albumPhotos);

    if (notReady) {
      return (
        <Alert sx={{ mx: 4 }} severity="warning">
          Still loading...
        </Alert>
      );
    }

    return (
      <Box sx={{}}>
        {showToolbar && (
          <Toolbar>
            <MightyButton
              mode="icon"
              label="Resets Flickr Cartridge"
              onClick={() => dispatch(resetFlickr())}
              icon="reset"
              color="secondary"
            />
          </Toolbar>
        )}

        <Box sx={{ mx: 2 }}>
          <CardHeader
            title={albumTitle}
            subheader={albumDescription}
            action={
              <MightyButton
                mode="icon"
                icon="flickr"
                label="View album on Flickr"
                color="inherit"
                onClick={() => window.open(albumURL, '_blank')}
              />
            }
          />

          <List>
            {albumPhotos.map((item: any, i: number) => {
              const photoTitle = item.title || '';
              const photoDescription = item.description || '';
              const thumbSrc = item?.sizes?.thumb?.src || '';

              return (
                <ListItemButton key={`item_${i}`}>
                  <ListItemAvatar sx={{ mr: 2 }}>
                    <img
                      style={{ borderRadius: '4px' }}
                      alt={photoTitle}
                      height={50}
                      width={50}
                      src={thumbSrc}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={photoTitle}
                    secondary={photoDescription}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Box>
    );
  }

  if (mode === 'album-card') {
    return (
      <Advert
        title={'Flickr Cartridge'}
        description={'Photos, titles and other meta data managed by Flickr'}
        onClick={() => {
          dispatch(routeTo('/free/flickr', router));
        }}
      />
    );
  }

  if (mode === 'default') return <></>;

  return (
    <pre style={{ fontSize: 10 }}>
      flickrSlice: {JSON.stringify(flickrSlice, null, 2)}
    </pre>
  );
}
